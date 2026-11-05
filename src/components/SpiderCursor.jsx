import { useEffect, useRef } from "react";

/**
 * Canvas spider-web cursor effect, used as a section background.
 * Spiders follow the pointer while it is over the parent element and
 * idle-wander otherwise. Sized to the parent, not the viewport.
 */
export default function SpiderCursor({
  className = "",
  background = "#000000",
  web = "#ffffff",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const { sin, cos, PI, hypot, min, max } = Math;

    let w = 0;
    let h = 0;
    let raf = 0;

    const rnd = (x = 1, dx = 0) => Math.random() * x + dx;
    const many = (n, f) => [...Array(n)].map((_, i) => f(i));
    const lerp = (a, b, t) => a + (b - a) * t;

    function noise(x, y, t = 101) {
      const w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
      const w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
      return w0 + w1;
    }

    function drawCircle(x, y, r) {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
      ctx.fill();
    }

    function drawLine(x0, y0, x1, y1) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      many(24, (i) => {
        const t = (i + 1) / 24;
        const x = lerp(x0, x1, t);
        const y = lerp(y0, y1, t);
        const k = noise(x / 5 + x0, y / 5 + y0) * 2;
        ctx.lineTo(x + k, y + k);
      });
      ctx.stroke();
    }

    function spawn() {
      const pts = many(220, () => ({ x: rnd(w || 1), y: rnd(h || 1), len: 0, r: 0 }));
      const legs = many(9, (i) => ({ x: cos((i / 9) * PI * 2), y: sin((i / 9) * PI * 2) }));

      const seed = rnd(100);
      let tx = rnd(w || 1);
      let ty = rnd(h || 1);
      let x = tx;
      let y = ty;
      const kx = rnd(0.5, 0.5);
      const ky = rnd(0.5, 0.5);
      const walk = { x: rnd(50, 50), y: rnd(50, 50) };

      function paintPt(pt, bodyR) {
        legs.forEach((leg) => {
          if (!pt.len) return;
          drawLine(
            lerp(x + leg.x * bodyR, pt.x, pt.len * pt.len),
            lerp(y + leg.y * bodyR, pt.y, pt.len * pt.len),
            x + leg.x * bodyR,
            y + leg.y * bodyR
          );
        });
        drawCircle(pt.x, pt.y, pt.r);
      }

      return {
        follow(nx, ny) {
          tx = nx;
          ty = ny;
        },
        reseed() {
          pts.forEach((pt) => {
            pt.x = rnd(w);
            pt.y = rnd(h);
          });
        },
        tick(t) {
          const bodyR = w / rnd(120, 130);
          const fx = tx + cos(t * kx + seed) * walk.x;
          const fy = ty + sin(t * ky + seed) * walk.y;

          x += min(w / 100, (fx - x) / 10);
          y += min(w / 100, (fy - y) / 10);

          let i = 0;
          pts.forEach((pt) => {
            const len = hypot(pt.x - x, pt.y - y);
            let r = min(2, w / len / 5);
            const increasing = len < w / 10 && i++ < 8;
            if (increasing) r *= 1.5;
            pt.r = r;
            pt.len = max(0, min(pt.len + (increasing ? 0.1 : -0.1), 1));
            paintPt(pt, bodyR);
          });
        },
      };
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      const nw = Math.round(rect.width);
      const nh = Math.round(rect.height);
      if (!nw || !nh || (nw === w && nh === h)) return;
      w = canvas.width = nw;
      h = canvas.height = nh;
      spiders.forEach((s) => s.reseed());
    }

    const spiders = many(2, spawn);
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const handlePointerMove = (e) => {
      const rect = host.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
      spiders.forEach((s) => s.follow(px, py));
    };

    function anim(t) {
      raf = requestAnimationFrame(anim);
      if (!w || !h) return;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = ctx.strokeStyle = web;
      spiders.forEach((s) => s.tick(t / 1000));
    }

    window.addEventListener("pointermove", handlePointerMove);
    raf = requestAnimationFrame(anim);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [background, web]);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
