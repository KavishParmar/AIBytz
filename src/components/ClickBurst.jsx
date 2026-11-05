import React, { useEffect, useRef } from 'react';

export default function ClickBurst() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

    let W = 0, H = 0, DPR = 1;
    let animationFrameId;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cvs.width = Math.round(W * DPR);
      cvs.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    const WORDS = [
      { t: 'WEBSITE!', bg: '#F5B301', fg: '#191007' },
      { t: 'AI!', bg: '#FF5A1F', fg: '#ffffff' },
      { t: 'CHATBOT!', bg: '#F2F2F2', fg: '#141414' },
      { t: 'AUTOMATION!', bg: '#FF5A1F', fg: '#ffffff' },
      { t: 'BOOM!', bg: '#EDEDED', fg: '#1c1c1c' },
      { t: 'E-COMMERCE!', bg: '#F5B301', fg: '#191007' },
      { t: 'NICE!', bg: '#F2F2F2', fg: '#141414' }
    ];
    const PCOL = ['#FF6A00', '#FFB300', '#FF8C42', '#E8490F', '#FFD23F'];

    let wi = 0;
    const rings = [];
    const parts = [];
    const badges = [];

    function spawn(x, y) {
      rings.push({ x: x, y: y, t0: performance.now() });
      // tiny jitter so rapid same-spot clicks don't stack into one blob
      const jx = x + (Math.random() * 10 - 5);
      const jy = y + (Math.random() * 8 - 4);
      badges.push({
        x: jx, y: jy, t0: performance.now(), w: WORDS[wi % WORDS.length],
        rot: -0.14 + (Math.random() * 0.08 - 0.04)
      });
      wi++;
      const n = 12 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 90 + Math.random() * 190;
        parts.push({
          x: x, y: y,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
          rot: Math.random() * Math.PI, vr: (Math.random() * 2 - 1) * 9,
          s: 2.5 + Math.random() * 3.5, shape: Math.floor(Math.random() * 3),
          c: PCOL[Math.floor(Math.random() * PCOL.length)],
          t0: performance.now(), life: 620 + Math.random() * 260
        });
      }
    }

    const pointerDownHandler = (e) => {
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', pointerDownHandler);

    function easeOutBack(p) { const c = 1.70158; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); }
    function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }
    function rr(x, y, w, h, r) {
      ctx.beginPath(); ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }

    let last = performance.now();
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, W, H);

      // rings — oldest first so newest ring is on top
      for (let i = 0; i < rings.length; i++) {
        const g = rings[i];
        const p = (now - g.t0) / 620;
        if (p >= 1) { rings.splice(i, 1); i--; continue; }
        const r = 15 + 47 * easeOutCubic(p);
        const a = 1 - p;
        ctx.save(); ctx.translate(g.x, g.y); ctx.globalAlpha = a;
        ctx.strokeStyle = '#FF6A00'; ctx.lineWidth = 4.5 * (1 - p) + 0.8; ctx.lineCap = 'round';
        for (let s = 0; s < 5; s++) {
          const a0 = s * (Math.PI * 2 / 5) + p * 1.2;
          ctx.beginPath(); ctx.arc(0, 0, r, a0, a0 + 0.55); ctx.stroke();
        }
        ctx.globalAlpha = a * 0.35; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      // particles — oldest first
      for (let j = 0; j < parts.length; j++) {
        const q = parts[j];
        const age = (now - q.t0) / q.life;
        if (age >= 1) { parts.splice(j, 1); j--; continue; }
        q.vx *= Math.exp(-3.2 * dt); q.vy = q.vy * Math.exp(-3.2 * dt) + 300 * dt;
        q.x += q.vx * dt; q.y += q.vy * dt; q.rot += q.vr * dt;
        ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot);
        ctx.globalAlpha = age < 0.7 ? 1 : 1 - (age - 0.7) / 0.3; ctx.fillStyle = q.c;
        if (q.shape === 0) { ctx.fillRect(-q.s / 2, -q.s / 2, q.s, q.s); }
        else if (q.shape === 1) { ctx.beginPath(); ctx.arc(0, 0, q.s * 0.45, 0, Math.PI * 2); ctx.fill(); }
        else {
          ctx.beginPath(); ctx.moveTo(0, -q.s * 0.6); ctx.lineTo(q.s * 0.55, q.s * 0.45);
          ctx.lineTo(-q.s * 0.55, q.s * 0.45); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      }

      // badges — oldest first, so the LATEST click is always on top
      for (let k = 0; k < badges.length; k++) {
        const b = badges[k];
        const bp = (now - b.t0) / 1180;
        if (bp >= 1) { badges.splice(k, 1); k--; continue; }
        const pop = bp < 0.19 ? easeOutBack(bp / 0.19) : 1;
        const alpha = bp < 0.5 ? 1 : 1 - (bp - 0.5) / 0.5;
        const rise = -34 * easeOutCubic(bp);
        ctx.save(); ctx.translate(b.x, b.y + rise);
        ctx.rotate(b.rot + Math.sin(bp * 6) * 0.02 * (1 - bp));
        ctx.scale(pop, pop); ctx.globalAlpha = alpha;
        ctx.font = '900 15px "Arial Black", Arial, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const tw = ctx.measureText(b.w.t).width;
        const pw = tw + 32;
        const ph = 30;
        ctx.fillStyle = b.w.bg; rr(-pw / 2, -ph / 2, pw, ph, 15); ctx.fill();
        ctx.fillStyle = b.w.fg; ctx.fillText(b.w.t, 0, 1);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(frame);
    }

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', pointerDownHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'block'
      }}
    />
  );
}
