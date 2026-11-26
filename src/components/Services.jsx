import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import content from "../content/site.json";
import { useNavigationTransition } from "../context/NavigationTransition";

const SLUGS = ["ai-automations", "ai-employees", "ai-chatbots"];

const icons = [
  <svg key="ic1" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="8" y="8" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="17" cy="17" r="2.5" fill="currentColor" />
    <circle cx="31" cy="17" r="2.5" fill="currentColor" />
    <circle cx="17" cy="31" r="2.5" fill="currentColor" />
    <circle cx="31" cy="31" r="2.5" fill="currentColor" />
    <path d="M17 17L31 31M31 17L17 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3.5" fill="currentColor" />
    <line x1="24" y1="2" x2="24" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="40" x2="24" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="2" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>,

  <svg key="ic2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
    <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="21" cy="13" r="1.5" fill="currentColor" />
    <circle cx="27" cy="13" r="1.5" fill="currentColor" />
    <path d="M20 17c0 0 2 2.5 4 2.5s4-2.5 4-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="32" y="4" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="white" />
    <path d="M36 8.5h4M36 11.5h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,

  <svg key="ic3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 12a6 6 0 016-6h24a6 6 0 016 6v16a6 6 0 01-6 6H20l-8 7V34h-1a6 6 0 01-5-6V12z" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="20" r="2" fill="currentColor" />
    <circle cx="24" cy="20" r="2" fill="currentColor" />
    <circle cx="32" cy="20" r="2" fill="currentColor" />
    <path d="M38 3l1.5 3.5L43 8l-3.5 1.5L38 13l-1.5-3.5L33 8l3.5-1.5L38 3z" fill="currentColor" />
  </svg>,
];

const PEEK = 80;

function useViewportWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function CardContent({ card, icon, total, index }) {
  const { startTransition } = useNavigationTransition();
  const href = `/services/${SLUGS[index]}`;
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 text-vermilion">{icon}</div>
        <span className="font-mono text-sm text-[#999] tracking-wide">
          {card.n} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-display uppercase text-xl sm:text-2xl leading-tight text-paper mb-3">
        {card.title}
      </h3>

      <p className="font-sans text-sm sm:text-[0.925rem] leading-relaxed text-[#555] mb-6">
        {card.description}
      </p>

      <div className="h-px bg-[#e5e3dc] mb-5" />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion mb-3">
        {card.subheading}:
      </p>

      <ul className="flex flex-col gap-2.5 mb-6">
        {card.points.map((point) => (
          <li
            key={point}
            className="flex items-center gap-2.5 font-sans text-sm sm:text-[0.925rem] text-paper"
          >
            <span className="w-2 h-2 rounded-full bg-vermilion shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            startTransition(href, card.title);
          }}
          className="inline-flex items-center gap-1.5 font-display uppercase text-sm tracking-wide text-vermilion hover:gap-3 transition-all"
        >
          Learn More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

/*
 * Scroll-driven stacking card.
 *
 * Spread layout adapts to viewport:
 *   ≥ 1024px → 3 columns (all on one row)
 *   ≥  640px → 2 columns (card 0+1 top row, card 2 wraps below)
 *   <  640px → 1 column  (all stack vertically)
 */
function StackCard({ index, card, total, progress, vw }) {
  const count = total;
  const STACK_START = 0.08;
  const STACK_END = 0.55;
  const SPREAD_START = 0.60;
  const SPREAD_END = 0.80;

  const slice = (STACK_END - STACK_START) / count;
  const enterStart = STACK_START + index * slice;
  const enterEnd = enterStart + slice * 0.65;

  const stackedTop = index * PEEK;

  /* Determine the grid layout based on viewport width */
  const cols = vw >= 1500 ? 3 : vw >= 640 ? 2 : 1;

  /* Target positions for each card in the spread grid (in px from center) */
  const gap = 24;
  const cardW = cols === 3
    ? Math.min(400, (vw - 128 - gap * 2) / 3)
    : cols === 2
      ? Math.min(480, (vw - 64 - gap) / 2)
      : Math.min(640, vw - 32);

  /* Grid positions: col/row for each card */
  const col = cols === 1 ? 0 : index % cols;
  const row = cols === 1 ? index : Math.floor(index / cols);

  /* X offset from center in px */
  const gridCenterX = (cols - 1) / 2;
  const targetX = (col - gridCenterX) * (cardW + gap);

  /* Y offset for rows (only matters when cols < 3 and card wraps) */
  const cardH = 520;
  const targetY = row * (cardH + gap);

  const smoothStep = (t) => t * t * (3 - 2 * t);

  const y = useTransform(progress, (p) => {
    if (p < enterStart) return "110vh";
    if (p < enterEnd) {
      const t = (p - enterStart) / (enterEnd - enterStart);
      const ease = 1 - Math.pow(1 - t, 3);
      const from = window.innerHeight * 1.1;
      return `${from + (stackedTop - from) * ease}px`;
    }
    if (p < SPREAD_START) return `${stackedTop}px`;
    const t = Math.min((p - SPREAD_START) / (SPREAD_END - SPREAD_START), 1);
    const ease = smoothStep(t);
    return `${stackedTop * (1 - ease) + targetY * ease}px`;
  });

  const opacity = useTransform(progress, (p) => {
    if (p < enterStart) return 0;
    if (p < enterStart + slice * 0.25) return (p - enterStart) / (slice * 0.25);
    return 1;
  });

  const buried = count - 1 - index;
  const scaleStacked = 1 - buried * 0.025;

  const scale = useTransform(progress, (p) => {
    if (p < enterEnd) return 1;
    if (p < SPREAD_START) return scaleStacked;
    const t = Math.min((p - SPREAD_START) / (SPREAD_END - SPREAD_START), 1);
    return scaleStacked + (1 - scaleStacked) * t;
  });

  const x = useTransform(progress, (p) => {
    if (p < SPREAD_START) return "-50%";
    const t = Math.min((p - SPREAD_START) / (SPREAD_END - SPREAD_START), 1);
    const ease = smoothStep(t);
    return `calc(-50% + ${targetX * ease}px)`;
  });

  const width = useTransform(progress, (p) => {
    const stackW = Math.min(640, vw * 0.88);
    if (p < SPREAD_START) return `${stackW}px`;
    const t = Math.min((p - SPREAD_START) / (SPREAD_END - SPREAD_START), 1);
    const ease = smoothStep(t);
    if (ease < 0.01) return `${stackW}px`;
    return `${stackW + (cardW - stackW) * ease}px`;
  });

  const shadow = useTransform(progress, (p) => {
    if (p < enterEnd || p > SPREAD_END) return "0 4px 20px rgba(0,0,0,0.06)";
    return "0 8px 32px rgba(0,0,0,0.10)";
  });

  return (
    <motion.div
      className="absolute left-1/2 flex flex-col bg-white rounded-2xl border border-[#e0ddd6] p-7 sm:p-8"
      style={{
        y,
        x,
        opacity,
        scale,
        width,
        boxShadow: shadow,
        zIndex: index + 1,
        transformOrigin: "center top",
      }}
    >
      <CardContent card={card} icon={icons[index]} total={total} index={index} />
    </motion.div>
  );
}

export default function Services() {
  const { services } = content;
  const total = services.cards.length;
  const sectionRef = useRef(null);
  const vw = useViewportWidth();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [phase, setPhase] = useState("stack");
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.84 && phase !== "grid") setPhase("grid");
    else if (v <= 0.84 && phase !== "stack") setPhase("stack");
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white relative"
      style={{ height: `${(total + 3) * 100}vh` }}
    >
      {/* Sticky viewport for stacking animation — fully blank until cards enter */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ display: phase === "grid" ? "none" : undefined }}
      >
        <div className="relative w-full h-full flex items-start justify-center pt-[10vh]">
          {services.cards.map((card, i) => (
            <StackCard
              key={card.n}
              index={i}
              card={card}
              total={total}
              progress={scrollYProgress}
              vw={vw}
            />
          ))}
        </div>
      </div>

      {/* Final grid: wraps 3→2→1 columns based on screen */}
      <div
        className="sticky top-0 min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16"
        style={{ display: phase === "grid" ? undefined : "none" }}
      >
        <div className="mx-auto max-w-[1400px] w-full flex flex-wrap gap-6 justify-center">
          {services.cards.map((card, i) => (
            <div
              key={card.n}
              className="w-full sm:w-[calc(50%-12px)] [@media(min-width:1500px)]:w-[calc(33.333%-16px)] max-w-[480px] bg-white rounded-2xl border border-[#e0ddd6] p-7 sm:p-8 flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              <CardContent card={card} icon={icons[i]} total={total} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
