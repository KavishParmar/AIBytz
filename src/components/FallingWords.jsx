import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const WORDS = [
  "AI",
  "AUTOMATION",
  "CHATBOT",
  "WEBSITE",
  "E-COMMERCE",
  "WHATSAPPBOT",
  "N8N",
  "CLAUDE",
  "CHATGPT",
  "KAVISH",
  "AIBYTZ",
];

// --- physics constants (tuned for "heavy object" feel: real fall, small bounce) ---
const GRAVITY = 2600;          // px / s^2
const RESTITUTION = 0.16;      // bounce energy kept — low, so blocks settle fast
const ANGULAR_RESTITUTION = 0.1;
const FRICTION = 0.92;         // high grip so words hold their angle and pile into a mountain
const LINEAR_DAMPING = 0.012;
const ANGULAR_DAMPING = 0.14;
const WAKE_SPEED = 60;         // px/s a moving body needs to wake a sleeping one
const REST_EPSILON = 0.7;     // px of per-frame motion below which a body counts as resting
const SLEEP_FRAMES = 10;
const DROP_INTERVAL = 620;     // ms between words
const SOLVER_ITERATIONS = 18;  // tall piles need many passes or they sink and shiver
const MAX_DT = 1 / 120;
const DOZER_SPEED = 260;       // px/s the bulldozer drives leftward
const DOZER_PAUSE = 900;       // ms the settled pile is admired before it rolls in
const FLOOR_INSET = 0;       // pile and dozer sit flush on the section's bottom edge

function rand(min, max) {
  return min + Math.random() * (max - min);
}

/** Oriented box: half-extents (hw, hh), center (x, y), angle a. */
function corners(b) {
  const c = Math.cos(b.a);
  const s = Math.sin(b.a);
  const { hw, hh, x, y } = b;
  return [
    [x + c * hw - s * hh, y + s * hw + c * hh],
    [x - c * hw - s * hh, y - s * hw + c * hh],
    [x - c * hw + s * hh, y - s * hw - c * hh],
    [x + c * hw + s * hh, y + s * hw - c * hh],
  ];
}

/** Separating-axis test between two oriented boxes. Returns {nx, ny, depth} or null. */
function boxOverlap(a, b) {
  const axes = [
    [Math.cos(a.a), Math.sin(a.a)],
    [-Math.sin(a.a), Math.cos(a.a)],
    [Math.cos(b.a), Math.sin(b.a)],
    [-Math.sin(b.a), Math.cos(b.a)],
  ];
  const ca = corners(a);
  const cb = corners(b);

  let bestDepth = Infinity;
  let bestAxis = null;

  for (const [ax, ay] of axes) {
    let minA = Infinity;
    let maxA = -Infinity;
    let minB = Infinity;
    let maxB = -Infinity;
    for (const [px, py] of ca) {
      const p = px * ax + py * ay;
      if (p < minA) minA = p;
      if (p > maxA) maxA = p;
    }
    for (const [px, py] of cb) {
      const p = px * ax + py * ay;
      if (p < minB) minB = p;
      if (p > maxB) maxB = p;
    }
    const overlap = Math.min(maxA, maxB) - Math.max(minA, minB);
    if (overlap <= 0) return null;
    if (overlap < bestDepth) {
      bestDepth = overlap;
      bestAxis = [ax, ay];
    }
  }

  // Point the normal from a toward b.
  let [nx, ny] = bestAxis;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (dx * nx + dy * ny < 0) {
    nx = -nx;
    ny = -ny;
  }
  return { nx, ny, depth: bestDepth };
}

/** Approximate contact point: deepest corners of each box along the normal. */
function contactPoint(a, b, nx, ny) {
  let best = null;
  let bestProj = -Infinity;
  for (const [px, py] of corners(a)) {
    const proj = px * nx + py * ny;
    if (proj > bestProj) {
      bestProj = proj;
      best = [px, py];
    }
  }
  let best2 = null;
  let bestProj2 = Infinity;
  for (const [px, py] of corners(b)) {
    const proj = px * nx + py * ny;
    if (proj < bestProj2) {
      bestProj2 = proj;
      best2 = [px, py];
    }
  }
  return [(best[0] + best2[0]) / 2, (best[1] + best2[1]) / 2];
}

function resolvePair(a, b, nx, ny, depth) {
  const invMassSum = a.invMass + b.invMass;
  if (invMassSum === 0) return;

  // Positional correction (slop keeps stacks from jittering).
  const slop = 0.05;
  const correction = (Math.max(depth - slop, 0) / invMassSum) * 0.95;
  a.x -= nx * correction * a.invMass;
  a.y -= ny * correction * a.invMass;
  b.x += nx * correction * b.invMass;
  b.y += ny * correction * b.invMass;

  const [cx, cy] = contactPoint(a, b, nx, ny);
  const rax = cx - a.x;
  const ray = cy - a.y;
  const rbx = cx - b.x;
  const rby = cy - b.y;

  // Relative velocity at the contact.
  const rvx = b.vx - b.av * rby - (a.vx - a.av * ray);
  const rvy = b.vy + b.av * rbx - (a.vy + a.av * rax);
  const velAlongNormal = rvx * nx + rvy * ny;
  if (velAlongNormal > 0) return;

  const raCrossN = rax * ny - ray * nx;
  const rbCrossN = rbx * ny - rby * nx;
  const denom =
    invMassSum + raCrossN * raCrossN * a.invInertia + rbCrossN * rbCrossN * b.invInertia;
  if (denom === 0) return;

  // Only bounce on a decent impact speed — slow settling contacts land dead.
  const e = -velAlongNormal > 90 ? RESTITUTION : 0;
  const j = (-(1 + e) * velAlongNormal) / denom;

  a.vx -= j * nx * a.invMass;
  a.vy -= j * ny * a.invMass;
  a.av -= j * raCrossN * a.invInertia * (1 - ANGULAR_RESTITUTION);
  b.vx += j * nx * b.invMass;
  b.vy += j * ny * b.invMass;
  b.av += j * rbCrossN * b.invInertia * (1 - ANGULAR_RESTITUTION);

  // Friction along the contact tangent.
  const tx = -ny;
  const ty = nx;
  const rvx2 = b.vx - b.av * rby - (a.vx - a.av * ray);
  const rvy2 = b.vy + b.av * rbx - (a.vy + a.av * rax);
  const velAlongTangent = rvx2 * tx + rvy2 * ty;
  const raCrossT = rax * ty - ray * tx;
  const rbCrossT = rbx * ty - rby * tx;
  const denomT =
    invMassSum + raCrossT * raCrossT * a.invInertia + rbCrossT * rbCrossT * b.invInertia;
  if (denomT === 0) return;

  let jt = -velAlongTangent / denomT;
  const maxFriction = Math.abs(j) * FRICTION;
  jt = Math.max(-maxFriction, Math.min(maxFriction, jt));

  a.vx -= jt * tx * a.invMass;
  a.vy -= jt * ty * a.invMass;
  a.av -= jt * raCrossT * a.invInertia;
  b.vx += jt * tx * b.invMass;
  b.vy += jt * ty * b.invMass;
  b.av += jt * rbCrossT * b.invInertia;
}

export default function FallingWords() {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let fontSize = 0;
    let bodies = [];
    let queue = [];
    let nextDropAt = 0;
    let doneAt = 0;
    let dozer = null;   // kinematic blade, non-null once the push starts
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let running = true;

    const measure = (word) => {
      ctx.font = `${fontSize}px "Anton", "Archivo", sans-serif`;
      const m = ctx.measureText(word);
      return m.width;
    };

    const buildQueue = () => {
      // Shuffled order so each cycle stacks differently.
      const order = WORDS.map((w, i) => ({ w, k: Math.random(), i }))
        .sort((a, b) => a.k - b.k)
        .map((o) => o.w);

      queue = order.map((word) => {
        const w = measure(word) + fontSize * 0.14;
        const h = fontSize * 0.82;
        const hw = w / 2;
        const hh = h / 2;
        const mass = (w * h) / 4000;
        return {
          word,
          hw,
          hh,
          w,
          h,
          x: 0,
          y: 0,
          a: 0,
          vx: 0,
          vy: 0,
          av: 0,
          invMass: 1 / mass,
          invInertia: 1 / ((mass * (w * w + h * h)) / 12),
          px: 0,
          py: 0,
          pa: 0,
          asleep: false,
          restFrames: 0,
        };
      });
    };

    const reset = () => {
      // Survivors of the last pass stay on the ground and the new words pile on
      // top of them, so a missed word never blocks the next cycle.
      buildQueue();
      nextDropAt = 400;
      doneAt = 0;
      dozer = null;
      elapsed = 0;
    };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Match the hero headline scale: 12vw mobile, 8.5vw tablet, ~6.6rem desktop.
      // Match the hero headline cap-height: Anton renders tall, so the box uses
      // the same px size the headline does (12vw / 8.5vw / 6.6rem).
      fontSize = (width >= 1024 ? 105.6 : width >= 640 ? width * 0.085 : width * 0.12) * 0.32;
      reset();
    };

    const drop = (body) => {
      // Aim at the centre of the pile so each word lands on the ones already
      // down and the heap grows upward into a mountain. Early words spread a
      // little wider to lay a base; later ones tighten toward the peak.
      const margin = body.hw + 12;
      const usable = Math.max(width - margin * 2, 10);
      const centre = margin + usable / 2;
      const progress = bodies.length / WORDS.length;   // 0 = base, 1 = summit
      const spread = (0.16 - progress * 0.11) * usable;
      body.x = centre + rand(-spread, spread);
      body.y = -body.hh - rand(40, 160);
      // Land nearly flat with only a slight tilt, so words stack face-to-face
      // instead of wedging on a corner and sliding off the heap.
      body.a = rand(-0.1, 0.1);
      body.vx = rand(-12, 12);
      body.vy = rand(0, 40);
      body.av = rand(-0.35, 0.35);
      body.px = body.x;
      body.py = body.y;
      body.pa = body.a;
      body.asleep = false;
      body.restFrames = 0;
      bodies.push(body);
    };

    // The blade is a kinematic box: it has a pose and a velocity so contacts
    // resolve with the right push direction, but zero inverse mass, so the
    // words it hits move and it does not.
    const spawnDozer = () => {
      const scale = fontSize * 3.2;          // dozer height, tied to word size
      const bladeH = scale * 0.62;
      const bladeW = scale * 0.16;
      dozer = {
        scale,
        hw: bladeW / 2,
        hh: bladeH / 2,
        // Start fully off the right edge, blade sitting on the ground.
        x: width + scale * 1.6,
        y: height - FLOOR_INSET - bladeH / 2,
        a: 0,
        vx: -DOZER_SPEED,
        vy: 0,
        av: 0,
        invMass: 0,
        invInertia: 0,
        asleep: false,
      };
    };

    const advanceDozer = (dt) => {
      if (!dozer) return;
      dozer.x += dozer.vx * dt;
      dozer.y = height - FLOOR_INSET - dozer.hh;
    };

    const step = (dt) => {
      const floor = height - FLOOR_INSET;
      // Walls stay solid until the blade is genuinely on screen; opening them
      // any earlier lets the settling pile leak sideways and never come to rest.
      const pushing = !!dozer && dozer.x < width;

      for (const b of bodies) {
        if (b.asleep) continue;
        b.vy += GRAVITY * dt;
        b.vx *= 1 - LINEAR_DAMPING;
        b.av *= 1 - ANGULAR_DAMPING * dt * 60;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.a += b.av * dt;
      }

      for (let it = 0; it < SOLVER_ITERATIONS; it++) {
        // Static world bounds (floor + side walls) via corner projection.
        for (const b of bodies) {
          if (b.asleep) continue;
          const cs = corners(b);

          let deepest = 0;
          let point = null;
          for (const [px, py] of cs) {
            const d = py - floor;
            if (d > deepest) {
              deepest = d;
              point = [px, py];
            }
          }
          if (point) {
            b.y -= deepest * 0.85;
            const rx = point[0] - b.x;
            const ry = point[1] - b.y;
            const vpx = b.vx - b.av * ry;
            const vpy = b.vy + b.av * rx;
            if (vpy > 0) {
              const rCrossN = rx;
              const denom = b.invMass + rCrossN * rCrossN * b.invInertia;
              const e = vpy > 90 ? RESTITUTION : 0;
              const j = (-(1 + e) * vpy) / denom;
              b.vy += j * b.invMass;
              b.av += j * rCrossN * b.invInertia * (1 - ANGULAR_RESTITUTION);

              // Ground friction.
              let jt = -vpx / (b.invMass + ry * ry * b.invInertia);
              const maxF = Math.abs(j) * 0.95;
              jt = Math.max(-maxF, Math.min(maxF, jt));
              b.vx += jt * b.invMass;
              b.av += jt * -ry * b.invInertia;
            }
          }

          // Walls
          let minX = Infinity;
          let maxX = -Infinity;
          for (const [px] of corners(b)) {
            if (px < minX) minX = px;
            if (px > maxX) maxX = px;
          }
          // While the bulldozer works, the left wall opens so words can be
          // shoved clean out of frame; the right wall opens too so the blade
          // can enter from off-screen without trapping anything against it.
          if (!pushing && minX < 0) {
            b.x -= minX;
            if (b.vx < 0) b.vx *= -RESTITUTION;
          }
          if (!pushing && maxX > width) {
            b.x -= maxX - width;
            if (b.vx > 0) b.vx *= -RESTITUTION;
          }
        }

        // The blade shoves every word it touches. invMass/invInertia are 0, so
        // resolvePair moves only the word — the dozer drives through unmoved.
        if (dozer) {
          for (const b of bodies) {
            if (b.asleep) {
              // A word the blade reaches must wake, or it would be bulldozed
              // while frozen and simply slide as a dead block.
              const hit0 = boxOverlap(dozer, b);
              if (!hit0) continue;
              b.asleep = false;
              b.restFrames = 0;
            }
            const hit = boxOverlap(dozer, b);
            if (!hit) continue;
            resolvePair(dozer, b, hit.nx, hit.ny, hit.depth);
          }
        }

        // Pairwise contacts.
        for (let i = 0; i < bodies.length; i++) {
          for (let k = i + 1; k < bodies.length; k++) {
            const a = bodies[i];
            const b = bodies[k];
            if (a.asleep && b.asleep) continue;
            // Cheap broad-phase.
            const ra = Math.hypot(a.hw, a.hh);
            const rb = Math.hypot(b.hw, b.hh);
            if ((a.x - b.x) ** 2 + (a.y - b.y) ** 2 > (ra + rb) ** 2) continue;

            const hit = boxOverlap(a, b);
            if (!hit) continue;
            // Only wake a sleeping body if the *other* one is actually moving.
            // Waking on every touch made settled piles resurrect each other
            // forever, which is what made the stack vibrate instead of resting.
            const aMoving = !a.asleep && Math.hypot(a.vx, a.vy) > WAKE_SPEED;
            const bMoving = !b.asleep && Math.hypot(b.vx, b.vy) > WAKE_SPEED;
            if (a.asleep && !bMoving) continue;
            if (b.asleep && !aMoving) continue;
            if (a.asleep && bMoving) { a.asleep = false; a.restFrames = 0; }
            if (b.asleep && aMoving) { b.asleep = false; b.restFrames = 0; }
            resolvePair(a, b, hit.nx, hit.ny, hit.depth);
          }
        }
      }

    };

    // Judge settledness on how far a body actually moved over the whole frame.
    // Sampling velocity inside step() reads it right after gravity was re-added,
    // which never dips below the threshold — that was why nothing ever slept.
    const updateSleep = () => {
      for (const b of bodies) {
        if (b.asleep) continue;
        const moved = Math.hypot(b.x - b.px, b.y - b.py) + Math.abs(b.a - b.pa) * 30;
        if (moved < REST_EPSILON) {
          b.restFrames++;
          if (b.restFrames > SLEEP_FRAMES) {
            b.asleep = true;
            b.vx = 0;
            b.vy = 0;
            b.av = 0;
          }
        } else {
          b.restFrames = 0;
        }
        b.px = b.x;
        b.py = b.y;
        b.pa = b.a;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Anton", "Archivo", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (const b of bodies) {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.a);


        // draw text fill
        ctx.fillStyle = "#000000";
        ctx.fillText(b.word, 0, fontSize * 0.03);



        ctx.restore();
      }

      if (dozer) drawDozer();
    };

    // Small yellow machine with black tyres, drawn relative to the blade so the
    // body always trails on the right of the pushing edge.
    const drawDozer = () => {
      const u = dozer.scale / 100;          // unit: 1/100th of dozer height
      const groundY = height - FLOOR_INSET + 4 * u; // offset to touch the ground
      const bladeX = dozer.x;

      ctx.save();
      ctx.translate(bladeX, groundY);

      const YELLOW = "#F5C518";
      const BLACK = "#111111";

      // --- blade (at origin, facing left) ---
      ctx.fillStyle = YELLOW;
      ctx.strokeStyle = BLACK;
      ctx.lineWidth = 2.5 * u;
      ctx.beginPath();
      ctx.moveTo(-2 * u, -62 * u);
      ctx.lineTo(10 * u, -62 * u);
      ctx.lineTo(10 * u, -4 * u);
      ctx.lineTo(-8 * u, -4 * u);
      ctx.quadraticCurveTo(-8 * u, -34 * u, -2 * u, -62 * u);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // --- push arm ---
      ctx.strokeStyle = BLACK;
      ctx.lineWidth = 5 * u;
      ctx.beginPath();
      ctx.moveTo(10 * u, -26 * u);
      ctx.lineTo(30 * u, -34 * u);
      ctx.stroke();

      // --- chassis ---
      ctx.fillStyle = YELLOW;
      ctx.lineWidth = 2.5 * u;
      ctx.beginPath();
      ctx.roundRect(26 * u, -56 * u, 62 * u, 34 * u, 4 * u);
      ctx.fill();
      ctx.stroke();

      // --- cab ---
      ctx.beginPath();
      ctx.roundRect(46 * u, -88 * u, 34 * u, 34 * u, 4 * u);
      ctx.fill();
      ctx.stroke();
      // cab window
      ctx.fillStyle = BLACK;
      ctx.beginPath();
      ctx.roundRect(52 * u, -82 * u, 22 * u, 20 * u, 3 * u);
      ctx.fill();

      // --- track frame + tyres ---
      ctx.fillStyle = BLACK;
      ctx.beginPath();
      ctx.roundRect(24 * u, -24 * u, 68 * u, 20 * u, 10 * u);
      ctx.fill();

      // Wheels rotate with distance travelled so the machine reads as driving.
      const spin = -bladeX / (11 * u);
      for (const [wx, wr] of [[38, 9], [58, 7], [78, 9]]) {
        ctx.save();
        ctx.translate(wx * u, -13 * u);
        ctx.rotate(spin);
        ctx.fillStyle = BLACK;
        ctx.beginPath();
        ctx.arc(0, 0, wr * u, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = YELLOW;
        ctx.lineWidth = 2 * u;
        ctx.beginPath();
        ctx.moveTo(-wr * 0.6 * u, 0);
        ctx.lineTo(wr * 0.6 * u, 0);
        ctx.moveTo(0, -wr * 0.6 * u);
        ctx.lineTo(0, wr * 0.6 * u);
        ctx.stroke();
        ctx.restore();
      }

      // --- exhaust stack ---
      ctx.fillStyle = BLACK;
      ctx.fillRect(40 * u, -74 * u, 6 * u, 20 * u);

      ctx.restore();
    };

    const frame = (now) => {
      if (!running) return;
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05; // ignore tab-away jumps
      elapsed += dt * 1000;

      // Fixed-ish substeps keep the stack stable at any refresh rate.
      let remaining = dt;
      while (remaining > 0) {
        const s = Math.min(remaining, MAX_DT);
        advanceDozer(s);
        step(s);
        remaining -= s;
      }
      updateSleep();

      if (queue.length && elapsed >= nextDropAt) {
        drop(queue.shift());
        nextDropAt = elapsed + DROP_INTERVAL;
      }

      // The dozer sets off as soon as the final word has been released, so it
      // arrives while the last of the pile is still coming to rest instead of
      // waiting for the whole heap to settle first.
      if (!queue.length && !doneAt) doneAt = elapsed;
      if (doneAt && !dozer && elapsed - doneAt > DOZER_PAUSE) spawnDozer();

      if (dozer) {
        // Drop words that have been pushed clear of the left edge.
        for (let i = bodies.length - 1; i >= 0; i--) {
          const b = bodies[i];
          if (b.x + Math.hypot(b.hw, b.hh) < -20) bodies.splice(i, 1);
        }
        // Restart as soon as the dozer itself has driven out of frame. Any word
        // it failed to sweep is left standing and simply becomes part of the
        // next pile — waiting for an empty frame would stall the loop forever.
        if (dozer.x < -dozer.scale * 2.2) reset();
      }

      draw();
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const start = () => {
      resize();
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    // Anton must actually be loaded before measuring, otherwise measureText
    // reports fallback-font widths and the boxes do not match the glyphs.
    if (document.fonts && document.fonts.load) {
      document.fonts
        .load('100px "Anton"')
        .then(() => document.fonts.ready)
        .then(start)
        .catch(start);
    } else {
      start();
    }

    const onVisibility = () => {
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 select-none"
    />
  );
}
