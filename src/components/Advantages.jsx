import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ────────────────────────────────────────────────
   PRIMITIVES
──────────────────────────────────────────────── */

function Counter({ to, suffix = "", prefix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(ease * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* Smooth curved sparkline with animated draw + fill */
function Sparkline({ points, color = "#ff3b1f", w = 260, h = 72 }) {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [len, setLen] = useState(800);

  const pad = { t: 8, b: 20, l: 4, r: 4 };
  const W = w - pad.l - pad.r;
  const H = h - pad.t - pad.b;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = points.map((p) => (p - min) / (max - min || 1));
  const xs = norm.map((_, i) => pad.l + (i / (points.length - 1)) * W);
  const ys = norm.map((n) => pad.t + H - n * H);

  /* Catmull-Rom to smooth cubic bezier */
  const smooth = xs.map((x, i) => {
    if (i === 0) return `M ${x} ${ys[i]}`;
    const x0 = xs[i - 1], y0 = ys[i - 1];
    const cp1x = x0 + (x - (i > 1 ? xs[i - 2] : x0)) / 6;
    const cp1y = y0 + (ys[i] - (i > 1 ? ys[i - 2] : y0)) / 6;
    const cp2x = x - (i < xs.length - 1 ? xs[i + 1] - x0 : x - x0) / 6;
    const cp2y = ys[i] - (i < ys.length - 1 ? ys[i + 1] - y0 : ys[i] - y0) / 6;
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${ys[i]}`;
  }).join(" ");
  const fillPath = `${smooth} L ${xs[xs.length - 1]} ${pad.t + H} L ${pad.l} ${pad.t + H} Z`;

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  /* Grid lines */
  const gridY = [0, 0.5, 1].map((t) => pad.t + H - t * H);

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`fill-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {gridY.map((y, i) => (
        <line key={i} x1={pad.l} y1={y} x2={w - pad.r} y2={y}
          stroke="#14121a" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {/* Fill */}
      <motion.path d={fillPath} fill={`url(#fill-${color.replace("#","")})`}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }} />
      {/* Line */}
      <motion.path ref={pathRef} d={smooth}
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={len} strokeDashoffset={len}
        animate={inView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.4, delay: 0.05, ease: "easeOut" }} />
      {/* End dot */}
      <motion.circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r={5} fill={color}
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        style={{ transformOrigin: `${xs[xs.length - 1]}px ${ys[ys.length - 1]}px` }}
        transition={{ delay: 1.3, duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
      {/* Axis labels */}
      <text x={pad.l} y={h - 4} fontSize="7" fill="#14121a" opacity="0.4" fontFamily="JetBrains Mono, monospace">LOW</text>
      <text x={w - pad.r} y={h - 4} fontSize="7" fill="#14121a" opacity="0.4" fontFamily="JetBrains Mono, monospace" textAnchor="end">NOW</text>
    </svg>
  );
}

/* Animated bar chart with grid + value label on tallest bar */
function BarChart({ bars, color = "#ff3b1f" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const max = Math.max(...bars);
  return (
    <div ref={ref} className="relative w-full h-full flex items-end gap-[4px]">
      {/* Horizontal grid lines */}
      {[25, 50, 75, 100].map((pct) => (
        <div key={pct} className="absolute left-0 right-0 border-t border-paper/5"
          style={{ bottom: `${pct}%` }} />
      ))}
      {bars.map((h, i) => {
        const isPeak = h === max;
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative">
            {isPeak && inView && (
              <motion.span
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.6 }}
                className="absolute -top-5 font-mono text-[9px] font-bold"
                style={{ color }}
              >
                {h}%
              </motion.span>
            )}
            <motion.div
              className="w-full rounded-t-[3px] origin-bottom"
              style={{ backgroundColor: isPeak ? color : `${color}70`, height: `${h}%` }}
              initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* Neural network / flow diagram */
function FlowViz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const layers = [
    [{ id: "i1", y: 30 }, { id: "i2", y: 60 }, { id: "i3", y: 90 }],
    [{ id: "h1", y: 20 }, { id: "h2", y: 50 }, { id: "h3", y: 80 }, { id: "h4", y: 110 }],
    [{ id: "o1", y: 35 }, { id: "o2", y: 75 }, { id: "o3", y: 55 }],
  ];
  const xPositions = [40, 130, 220];
  const W = 260, H = 130;

  const edges = [];
  layers.forEach((layer, li) => {
    if (li === layers.length - 1) return;
    layer.forEach((src) => {
      layers[li + 1].forEach((tgt) => {
        edges.push({ x1: xPositions[li], y1: src.y, x2: xPositions[li + 1], y2: tgt.y });
      });
    });
  });

  const layerLabels = ["INPUTS", "AI CORE", "OUTPUTS"];

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-[140px]">
        {/* Edges */}
        {edges.map((e, i) => (
          <motion.line key={i}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="#ff3b1f" strokeOpacity="0.18" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.015, duration: 0.4 }}
          />
        ))}
        {/* Nodes */}
        {layers.map((layer, li) =>
          layer.map((node, ni) => (
            <motion.circle key={node.id}
              cx={xPositions[li]} cy={node.y} r={li === 1 ? 7 : 5.5}
              fill={li === 1 ? "#ff3b1f" : "#14121a"}
              fillOpacity={li === 1 ? 1 : 0.12}
              stroke="#ff3b1f" strokeWidth={li === 1 ? 0 : 1.5} strokeOpacity="0.5"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              style={{ transformOrigin: `${xPositions[li]}px ${node.y}px` }}
              transition={{ delay: 0.3 + li * 0.12 + ni * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          ))
        )}
        {/* Layer labels */}
        {layerLabels.map((label, i) => (
          <text key={label} x={xPositions[i]} y={H - 2}
            textAnchor="middle" fontSize="6.5"
            fill="#14121a" opacity="0.4" fontFamily="JetBrains Mono, monospace">
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* Radial / hub-and-spoke channels viz */
function HubViz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const channels = [
    { label: "WhatsApp", angle: -90, color: "#7ad100" },
    { label: "Email", angle: -18, color: "#ff3b1f" },
    { label: "SMS", angle: 54, color: "#ffcc33" },
    { label: "Live Chat", angle: 126, color: "#8b5cff" },
    { label: "Voice", angle: 198, color: "#2b5eff" },
  ];

  const R = 68, CX = 110, CY = 100;
  const toXY = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
  };
  const labelXY = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: CX + (R + 26) * Math.cos(rad), y: CY + (R + 26) * Math.sin(rad) };
  };

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 220 200" className="w-full h-full max-h-[170px]">
        {/* Orbit ring */}
        <motion.circle cx={CX} cy={CY} r={R} fill="none"
          stroke="#14121a" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }} />
        {/* Spokes */}
        {channels.map((ch, i) => {
          const pos = toXY(ch.angle);
          return (
            <motion.line key={ch.label}
              x1={CX} y1={CY} x2={pos.x} y2={pos.y}
              stroke={ch.color} strokeOpacity="0.25" strokeWidth="1.5"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }} />
          );
        })}
        {/* Channel dots + labels */}
        {channels.map((ch, i) => {
          const pos = toXY(ch.angle);
          const lpos = labelXY(ch.angle);
          return (
            <motion.g key={ch.label}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <circle cx={pos.x} cy={pos.y} r={10} fill={ch.color} fillOpacity="0.15" />
              <circle cx={pos.x} cy={pos.y} r={4.5} fill={ch.color} />
              <text x={lpos.x} y={lpos.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="7" fill="#14121a" opacity="0.65" fontFamily="JetBrains Mono, monospace">
                {ch.label}
              </text>
            </motion.g>
          );
        })}
        {/* Centre hub */}
        <motion.circle cx={CX} cy={CY} r={20} fill="#ff3b1f"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
        <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fill="#fdf8ec" fontFamily="Anton, sans-serif" letterSpacing="0.5">AI</text>
        <text x={CX} y={CY + 7} textAnchor="middle" dominantBaseline="middle"
          fontSize="5.5" fill="#fdf8ec" fontFamily="JetBrains Mono, monospace" opacity="0.8">CORE</text>
      </svg>
    </div>
  );
}

/* Dual-ring gauge: engineering vs bureaucracy */
function GaugeViz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const SIZE = 100;
  const cx = SIZE / 2, cy = SIZE / 2;

  const rings = [
    { r: 38, pct: 97, color: "#ff3b1f", label: "Execution", strokeW: 7 },
    { r: 26, pct: 3,  color: "#14121a", label: "Overhead", strokeW: 6 },
  ];

  return (
    <div ref={ref} className="flex items-center gap-6 w-full">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-[90px] h-[90px] shrink-0">
        {rings.map(({ r, pct, color, strokeW }) => {
          const circ = 2 * Math.PI * r;
          return (
            <g key={r}>
              <circle cx={cx} cy={cy} r={r} fill="none"
                stroke={color} strokeOpacity="0.08" strokeWidth={strokeW} />
              <motion.circle cx={cx} cy={cy} r={r} fill="none"
                stroke={color} strokeWidth={strokeW} strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={inView ? { strokeDashoffset: circ * (1 - pct / 100) } : {}}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: `${cx}px ${cy}px`, rotate: -90 }} />
            </g>
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700"
          fill="#14121a" fontFamily="JetBrains Mono, monospace">97%</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize="6"
          fill="#14121a" opacity="0.45" fontFamily="JetBrains Mono, monospace">BUILD</text>
      </svg>
      <div className="flex flex-col gap-2.5">
        {[
          { color: "#ff3b1f", label: "Execution", val: "97%" },
          { color: "#14121a", label: "Overhead", val: "3%" },
        ].map(({ color, label, val }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{label}:</span>
            <span className="font-mono text-[10px] font-bold text-paper">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   ICONS  (unique per card)
──────────────────────────────────────────────── */

const icons = {
  brain: (
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
      <path d="M10 6C7.5 6 5 8 5 11c0 1.5.6 2.8 1.5 3.7C5.6 15.6 5 17 5 18.5 5 21.5 7.5 23 10 23h1v-2h-1c-1.5 0-3-1-3-2.5 0-1 .5-2 1.4-2.6L9.5 15l-1-1A4 4 0 017 11c0-2 1.8-3 3-3h1V6h-1z" fill="currentColor" opacity=".2"/>
      <path d="M18 6c2.5 0 5 2 5 5 0 1.5-.6 2.8-1.5 3.7.9.9 1.5 2.3 1.5 3.8 0 3-2.5 4.5-5 4.5h-1v-2h1c1.5 0 3-1 3-2.5 0-1-.5-2-1.4-2.6L18.5 15l1-1A4 4 0 0021 11c0-2-1.8-3-3-3h-1V6h1z" fill="currentColor" opacity=".2"/>
      <rect x="11" y="5" width="6" height="18" rx="3" fill="currentColor" opacity=".15"/>
      <circle cx="14" cy="10" r="2.5" fill="currentColor"/>
      <circle cx="14" cy="18" r="2.5" fill="currentColor"/>
      <line x1="14" y1="12.5" x2="14" y2="15.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  channels: (
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
      <circle cx="14" cy="14" r="3.5" fill="currentColor"/>
      <circle cx="14" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="23" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="23" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="23" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="5" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="5" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="10.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
      <line x1="16.8" y1="12" x2="20.3" y2="10.7" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
      <line x1="16.8" y1="16" x2="20.3" y2="18" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
      <line x1="14" y1="17.5" x2="14" y2="20.5" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
      <line x1="11.2" y1="16" x2="7.7" y2="18" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
      <line x1="11.2" y1="12" x2="7.7" y2="10.7" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
      <path d="M14 3c0 0 6 3 6 10v4l-6 8-6-8V13C8 6 14 3 14 3z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity=".12"/>
      <circle cx="14" cy="12" r="2.5" fill="currentColor"/>
      <path d="M10 17l-3 3M18 17l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
      <polyline points="4,22 9,14 13,17 18,9 24,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="5" r="2.5" fill="currentColor"/>
      <line x1="4" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="1.2" opacity=".25"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
      <rect x="6" y="13" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 13V10a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="14" cy="18.5" r="2" fill="currentColor"/>
      <line x1="14" y1="20.5" x2="14" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

/* ────────────────────────────────────────────────
   CARDS
──────────────────────────────────────────────── */

function CardHeader({ n, total, tag, icon }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="w-9 h-9 text-vermilion shrink-0">{icon}</div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-[9px] uppercase tracking-widest text-mist">{tag}</span>
        <span className="font-mono text-[10px] text-paper/30">
          {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* Card 1 — Custom Built — large (3 cols) */
function Card1() {
  return (
    <div className="flex flex-col h-full">
      <CardHeader n={1} total={5} tag="Foundation" icon={icons.brain} />
      <h3 className="font-display uppercase text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.0] text-paper mb-3">
        Custom<br />Built
      </h3>
      <p className="font-sans text-sm text-mist leading-relaxed max-w-sm mb-6">
        Every system is tailored to your stack — not a fragile template anyone can copy. We construct specialized workflows, databases, and integrations engineered for durability.
      </p>
      <div className="mt-auto">
        <div className="rounded-xl bg-ink p-4 h-[130px]">
          <FlowViz />
        </div>
        <div className="mt-4 flex items-center gap-6">
          <div>
            <span className="font-display text-[2.2rem] leading-none text-paper">
              <Counter to={100} suffix="%" duration={1400} />
            </span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-mist mt-0.5">Tailored</p>
          </div>
          <div className="h-10 w-px bg-paper/10" />
          <div>
            <span className="font-display text-[2.2rem] leading-none text-paper">
              <Counter to={0} suffix="" duration={1000} />
            </span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-mist mt-0.5">Templates used</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Card 2 — Every channel, one brain — medium (2 cols) */
function Card2() {
  return (
    <div className="flex flex-col h-full">
      <CardHeader n={2} total={5} tag="Reach" icon={icons.channels} />
      <h3 className="font-display uppercase text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.0] text-paper mb-3">
        Every Channel.<br />One Brain.
      </h3>
      <p className="font-sans text-sm text-mist leading-relaxed mb-5">
        WhatsApp, email, SMS, live chat, voice — unified under one AI that knows your business context and never clocks out.
      </p>
      <div className="mt-auto rounded-xl bg-ink p-3 flex items-center justify-center min-h-[160px]">
        <HubViz />
      </div>
    </div>
  );
}

/* Card 3 — Lean & fast — bottom-left (2 cols) */
function Card3() {
  return (
    <div className="flex flex-col h-full">
      <CardHeader n={3} total={5} tag="Speed" icon={icons.rocket} />
      <h3 className="font-display uppercase text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.0] text-paper mb-2">
        Lean &amp; Fast
      </h3>
      <p className="font-sans text-xs text-mist leading-relaxed mb-5">
        Two engineers, zero committees. Your project ships in days — not sprints measured in quarters.
      </p>
      <div className="mt-auto">
        <div className="rounded-xl bg-ink p-5 mb-5">
          <GaugeViz />
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "Kickoff → Live", val: "7 days", fill: "#ff3b1f", pct: 85 },
            { label: "Iteration cycle", val: "48 hrs", fill: "#ff3b1f", pct: 60 },
          ].map(({ label, val, fill, pct }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-mist uppercase tracking-wider w-28 shrink-0">{label}</span>
              <div className="flex-1 h-[3px] bg-paper/6 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: fill }}
                  initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, ease: "easeOut" }} />
              </div>
              <span className="font-mono text-[10px] font-bold text-paper w-12 text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Card 4 — Revenue uplift — bottom-middle (2 cols) */
function Card4() {
  const points = [8, 11, 9, 15, 13, 20, 17, 26, 22, 33, 29, 41, 37, 50, 48, 62, 58, 76];
  return (
    <div className="flex flex-col h-full">
      <CardHeader n={4} total={5} tag="Growth" icon={icons.growth} />
      <h3 className="font-display uppercase text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.0] text-paper mb-2">
        Measurable<br />Outcomes
      </h3>
      <p className="font-sans text-xs text-mist leading-relaxed mb-5">
        Every automation we deploy ships with live analytics. You see hours saved, leads closed, and costs cut — in numbers.
      </p>
      <div className="mt-auto">
        <div className="rounded-xl bg-ink p-3 mb-4 h-[100px]">
          <Sparkline points={points} color="#ff3b1f" w={260} h={80} />
        </div>
        <div className="flex items-end gap-5">
          <div>
            <span className="font-display text-[2.5rem] leading-none text-paper">
              <Counter to={70} suffix="%" duration={1500} />
            </span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-mist mt-0.5">Time saved</p>
          </div>
          <div>
            <span className="font-display text-[2.5rem] leading-none text-paper">
              <Counter to={10} suffix="×" duration={1200} />
            </span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-mist mt-0.5">Throughput</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Card 5 — You own everything — bottom-right narrow (1 col) */
function Card5() {
  return (
    <div className="flex flex-col h-full">
      <CardHeader n={5} total={5} tag="Ownership" icon={icons.lock} />
      <h3 className="font-display uppercase text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.0] text-paper mb-2">
        Yours.<br />Forever.
      </h3>
      <p className="font-sans text-xs text-mist leading-relaxed mb-5">
        No subscriptions. No lock-in. Every line of code, every workflow, every data point — deeded to you on day one.
      </p>
      <div className="mt-auto rounded-xl bg-ink p-4 flex flex-col gap-0">
        {[
          { label: "Source code", tag: "100% yours" },
          { label: "Your data", tag: "100% yours" },
          { label: "Infrastructure", tag: "100% yours" },
          { label: "Zero vendor lock", tag: "guaranteed" },
        ].map(({ label, tag }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-paper/8 last:border-0">
            <span className="font-sans text-xs text-paper">{label}</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-vermilion font-bold">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   SECTION
──────────────────────────────────────────────── */

const base = "bg-white rounded-2xl border border-paper/[0.07] p-7 sm:p-8 flex flex-col hover:border-paper/20 hover:shadow-[0_16px_60px_rgba(0,0,0,0.07)] transition-all duration-400";

export default function Advantages() {
  return (
    <section
      id="advantages"
      className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14"
        >
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-2">
            Why AIBytz
          </p>
          <h2 className="font-display uppercase text-[clamp(2.8rem,6vw,5.5rem)] leading-none text-paper">
            What We<br className="hidden sm:block" /> Build Best
          </h2>
        </motion.div>

        {/*
          Desktop (lg): 5-column grid
            Row 1: [Card1 — 3 cols] [Card2 — 2 cols]   ← tall (~380px)
            Row 2: [Card3 — 2 cols] [Card4 — 2 cols] [Card5 — 1 col]  ← medium (~320px)
          Tablet (sm): 2-col
          Mobile: 1-col
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: 0.04 }}
            className={`${base} lg:col-span-3 min-h-[360px]`}>
            <Card1 />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: 0.10 }}
            className={`${base} lg:col-span-2 min-h-[360px]`}>
            <Card2 />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: 0.16 }}
            className={`${base} lg:col-span-2 min-h-[300px]`}>
            <Card3 />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: 0.22 }}
            className={`${base} lg:col-span-2 min-h-[300px]`}>
            <Card4 />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: 0.28 }}
            className={`${base} lg:col-span-1 min-h-[300px]`}>
            <Card5 />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
