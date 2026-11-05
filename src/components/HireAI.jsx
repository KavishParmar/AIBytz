import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Dozer from "./Dozer";

const TAGS = ["AI-POWERED", "DATA-DRIVEN", "SCALABLE", "RESULT-ORIENTED"];

const ROTATIONS = [
  { line1: "YOUR TEAM HAS", line2: "BETTER THINGS TO DO." },
  { line1: "YOU HAVE", line2: "MUCH TO SCALE." },
  { line1: "YOUR GROWTH", line2: "CAN'T WAIT." },
];

const TYPE_SPEED = 30;
const HOLD_DURATION = 400;
const FADE_DURATION = 300;

function useHireTypewriter() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(
    ROTATIONS[0].line1.length + 1 + ROTATIONS[0].line2.length
  );
  const [phase, setPhase] = useState("hold");
  const timerRef = useRef(null);

  const current = ROTATIONS[index];
  const combined = current.line1 + "\n" + current.line2;

  useEffect(() => {
    if (reduceMotion) return;
    clearTimeout(timerRef.current);

    if (phase === "typing") {
      if (length < combined.length) {
        timerRef.current = setTimeout(() => setLength((l) => l + 1), TYPE_SPEED);
      } else {
        setPhase("hold");
      }
    } else if (phase === "hold") {
      timerRef.current = setTimeout(() => setPhase("fading"), HOLD_DURATION);
    } else if (phase === "fading") {
      timerRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATIONS.length);
        setLength(0);
        setPhase("typing");
      }, FADE_DURATION);
    }

    return () => clearTimeout(timerRef.current);
  }, [phase, length, combined, reduceMotion]);

  const displayed = reduceMotion ? combined : combined.slice(0, length);
  const [line1Text, line2Text = ""] = displayed.split("\n");

  return {
    line1Text,
    line2Text,
    isFading: phase === "fading",
  };
}

/* ─── Desktop horizontal-scroll panels ─── */

function SplitPanel() {
  const { line1Text, line2Text, isFading } = useHireTypewriter();

  return (
    <div className="w-screen h-screen flex shrink-0">
      {/* Left side */}
      <div className="w-1/2 h-full bg-ink flex items-center">
        <div className="px-10 lg:px-16 xl:px-24 py-12 lg:py-20 w-full">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="font-display uppercase leading-[1.08] text-[4.2vw] lg:text-[3.6rem] xl:text-[4.2rem] tracking-tight text-paper">
              HIRE <span className="text-paper">AI</span>
            </h2>
            <span className="font-mono text-[1.1vw] lg:text-xs xl:text-sm tracking-wide text-mist/60 uppercase">(keep your weekends free)</span>
          </div>

          {/* Typewriter rotating lines */}
          <div className="relative mt-4">
            {/* invisible spacer keeps height stable */}
            <p aria-hidden className="invisible font-display uppercase leading-[1.08] text-[3.2vw] lg:text-[2.8rem] xl:text-[3.2rem] tracking-tight">
              {ROTATIONS[0].line1}<br />{ROTATIONS[0].line2}
            </p>
            <p
              className="absolute inset-0 font-display uppercase leading-[1.08] text-[3.2vw] lg:text-[2.8rem] xl:text-[3.2rem] tracking-tight transition-opacity ease-out"
              style={{ opacity: isFading ? 0 : 1, transitionDuration: `${FADE_DURATION}ms` }}
            >
              <span className="text-vermilion">{line1Text}</span>
              <br />
              <span className="text-paper">{line2Text}</span>
              <span className="typewriter-cursor inline-block w-[0.05em] ml-1 -mb-1 h-[0.82em] bg-paper align-middle" aria-hidden />
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-8 lg:mt-12">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 border-[1.5px] border-paper rounded-full bg-white px-3 py-1.5 font-mono text-[10px] lg:text-xs tracking-wider text-mist uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-paper shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center divider — inline, not absolute, so it sits exactly between the two halves */}
      <div className="w-[2px] h-full bg-paper shrink-0 z-10" />

      {/* Right side */}
      <div className="w-[calc(50%-1px)] h-full bg-white flex items-center">
        <div className="px-10 lg:px-16 xl:px-24 py-12 lg:py-20 w-full">
          <p className="font-mono text-base lg:text-lg leading-[1.85] text-mist w-full">
            The businesses pulling ahead right now aren't hiring faster — they're
            automating smarter. While you're still manually sorting leads and
            following up three days late, AI can do it in three seconds. We build
            the systems that close that gap before your competitors do, Hire
            AIBytz's employee and get ahead of everyone.
          </p>

          <p className="mt-8 font-mono text-base lg:text-lg font-bold leading-[1.85] w-full underline decoration-paper underline-offset-4">
            <span className="text-paper">Currently </span>
            <span className="text-vermilion">While you read this,</span>
            <span className="text-paper"> your AI employee could be </span>
            <span className="text-vermilion">replying to a lead.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TextPanel({ progress }) {
  /* progress goes 0 → 1 as user scrolls through this panel's portion.
     Subline is split into two rows, each pushed by a side-view bulldozer:
       Line 1 "One thing done best" — slides from LEFT, dozer on left facing RIGHT
       Line 2 "— AI Automation"     — slides from RIGHT, dozer on right facing LEFT
     Then heading "What we build" rises from below with top-down dozers. */

  /* Line 1: slides in from far left (0 → 0.30) */
  const line1X = useTransform(progress, [0, 0.30], ["-100vw", "0vw"]);
  /* Line 1 dozer fades out after line settles */
  const dozer1Opacity = useTransform(progress, [0.30, 0.40], [1, 0]);

  /* Line 2: slides in from far right (0.10 → 0.38) */
  const line2X = useTransform(progress, [0.10, 0.38], ["100vw", "0vw"]);
  /* Line 2 dozer fades out after line settles */
  const dozer2Opacity = useTransform(progress, [0.38, 0.48], [1, 0]);

  /* Heading: rises from below (0.40 → 0.80) */
  const headY = useTransform(progress, [0.40, 0.80], ["100vh", "0vh"]);
  /* Top-down dozers under heading fade after it settles */
  const dozerUpOpacity = useTransform(progress, [0.88, 0.96], [1, 0]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-ink shrink-0 overflow-hidden">
      <div className="flex flex-col items-center px-6">

        {/* Single line: left half slides from left, right half slides from right.
            No overflow-hidden here — the outer w-screen div clips at the screen edges. */}
        <div className="flex items-center justify-center mb-6">
          {/* Left half: dozer (facing right) + "One thing done best" */}
          <motion.div
            style={{ x: line1X }}
            className="flex items-center gap-4 shrink-0"
          >
            <motion.div style={{ opacity: dozer1Opacity }} className="shrink-0">
              <Dozer view="side" className="w-[7vw] lg:w-[5.5rem]" />
            </motion.div>
            <p className="font-mono text-base lg:text-lg uppercase tracking-[0.3em] text-vermilion whitespace-nowrap">
              One thing done best
            </p>
          </motion.div>

          {/* Right half: "— AI Automation" + dozer (facing left) */}
          <motion.div
            style={{ x: line2X }}
            className="flex items-center gap-4 shrink-0"
          >
            <p className="font-mono text-base lg:text-lg uppercase tracking-[0.3em] text-vermilion whitespace-nowrap">
              &nbsp;— AI Automation
            </p>
            <motion.div style={{ opacity: dozer2Opacity }} className="shrink-0">
              <Dozer view="side" className="w-[7vw] lg:w-[5.5rem] -scale-x-100" />
            </motion.div>
          </motion.div>
        </div>

        {/* Heading + top-down dozers rise from below */}
        <motion.div style={{ y: headY }} className="relative">
          <h2 className="font-display uppercase text-[8vw] lg:text-[7rem] xl:text-[8rem] leading-[0.95] tracking-tight text-paper underline decoration-vermilion decoration-[3px] underline-offset-[10px]">
            What <span className="text-vermilion">we</span> build
          </h2>
          <motion.div
            style={{ opacity: dozerUpOpacity }}
            className="flex items-center justify-center gap-[6vw] mt-3 pointer-events-none"
          >
            <Dozer view="top" className="w-[8vw] lg:w-[7rem]" />
            <Dozer view="top" className="w-[8vw] lg:w-[7rem]" />
            <Dozer view="top" className="w-[8vw] lg:w-[7rem]" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

function DesktopHorizontalScroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* 400vh total scroll height:
     0–0.25  → horizontal slide from SplitPanel to TextPanel
     0.25–1  → TextPanel is pinned; sublines slide in, heading rises, dozers fade */
  const x = useTransform(scrollYProgress, [0, 0.25], ["0vw", "-100vw"]);
  const textProgress = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full w-[200vw]" style={{ x }}>
          <SplitPanel />
          <TextPanel progress={textProgress} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Stacked layout for screens < 1040px ─── */

function StackedLayout() {
  const { line1Text, line2Text, isFading } = useHireTypewriter();

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Left content */}
      <div className="bg-ink px-4 sm:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="font-display uppercase leading-[1.08] text-[11vw] sm:text-[8vw] tracking-tight text-paper">
              HIRE <span className="text-paper">AI</span>
            </h2>
            <span className="font-mono text-[2.8vw] sm:text-xs tracking-wide text-mist/60 uppercase">(keep your weekends free)</span>
          </div>

          {/* Typewriter rotating lines */}
          <div className="relative mt-3">
            <p aria-hidden className="invisible font-display uppercase leading-[1.08] text-[7.5vw] sm:text-[5.5vw] tracking-tight">
              {ROTATIONS[0].line1}<br />{ROTATIONS[0].line2}
            </p>
            <p
              className="absolute inset-0 font-display uppercase leading-[1.08] text-[7.5vw] sm:text-[5.5vw] tracking-tight transition-opacity ease-out"
              style={{ opacity: isFading ? 0 : 1, transitionDuration: `${FADE_DURATION}ms` }}
            >
              <span className="text-vermilion">{line1Text}</span>
              <br />
              <span className="text-paper">{line2Text}</span>
              <span className="typewriter-cursor inline-block w-[0.05em] ml-1 -mb-1 h-[0.82em] bg-paper align-middle" aria-hidden />
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-5 sm:mt-7">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 border-[1.5px] border-paper rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] sm:text-xs tracking-wider text-mist uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-paper shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right content — same bg-ink background */}
      <div className="bg-ink px-4 sm:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="font-mono text-sm sm:text-base leading-[1.85] text-mist w-full">
            The businesses pulling ahead right now aren't hiring faster — they're
            automating smarter. While you're still manually sorting leads and
            following up three days late, AI can do it in three seconds. We build
            the systems that close that gap before your competitors do, Hire
            AIBytz's employee and get ahead of everyone.
          </p>

          <p className="mt-5 sm:mt-7 font-mono text-sm sm:text-base font-bold leading-[1.85] underline decoration-paper underline-offset-4 w-full">
            <span className="text-paper">Currently </span>
            <span className="text-vermilion">While you read this,</span>
            <span className="text-paper"> your AI employee could be </span>
            <span className="text-vermilion">replying to a lead.</span>
          </p>
        </motion.div>
      </div>

      {/* Horizontal divider at the BOTTOM of the combined section */}
      <div className="w-full h-[2px] bg-paper" />
    </div>
  );
}

/* ─── Root export ─── */

export default function HireAI() {
  return (
    <section className="relative w-full">
      {/* Horizontal scroll — only at 1040px+ */}
      <div className="hidden [@media(min-width:1040px)]:block">
        <DesktopHorizontalScroll />
      </div>
      {/* Stacked — below 1040px */}
      <div className="[@media(min-width:1040px)]:hidden">
        <StackedLayout />
      </div>
    </section>
  );
}
