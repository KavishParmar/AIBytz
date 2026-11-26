import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TransitionLink from "./TransitionLink";
import content from "../content/site.json";
import FallingWords from "./FallingWords";
import { useHoverScramble, ScrambleChars } from "./HoverScrambleText";

const TYPE_SPEED = 55;
const HOLD_DURATION = 500;
const FADE_DURATION = 400;

function useTypewriterPair(rotations, reduceMotion) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(
    rotations[0].line2.length + 1 + rotations[0].line3.length
  );
  const [phase, setPhase] = useState("hold"); // "typing" | "hold" | "fading"
  const timeoutRef = useRef(null);

  const current = rotations[index];
  const combinedTarget = current.line2 + "\n" + current.line3;

  useEffect(() => {
    if (reduceMotion || rotations.length < 2) return undefined;

    if (phase === "typing") {
      if (length < combinedTarget.length) {
        timeoutRef.current = setTimeout(() => setLength((l) => l + 1), TYPE_SPEED);
      } else {
        setPhase("hold");
      }
    } else if (phase === "hold") {
      timeoutRef.current = setTimeout(() => setPhase("fading"), HOLD_DURATION);
    } else if (phase === "fading") {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotations.length);
        setLength(0);
        setPhase("typing");
      }, FADE_DURATION);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [phase, length, combinedTarget, reduceMotion, rotations.length]);

  const displayed = reduceMotion
    ? combinedTarget
    : combinedTarget.slice(0, length);
  const [line2Text, line3Text = ""] = displayed.split("\n");

  return {
    line2Text,
    line3Text,
    isFading: phase === "fading",
    showCursor: !reduceMotion && rotations.length > 1,
  };
}

export default function Hero() {
  const { hero } = content;
  const rotations = hero.headlineRotations;
  const reduceMotion = useReducedMotion();
  const { line2Text, line3Text, isFading, showCursor } = useTypewriterPair(rotations, reduceMotion);
  const { containerRef, onMouseMove, onMouseLeave } = useHoverScramble();

  return (
    <section id="top" className="hero-dots relative overflow-hidden pt-24 pb-6 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <FallingWords />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-3">
          <motion.h1
            ref={containerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display leading-[1.08] uppercase text-[12vw] sm:text-[8.5vw] lg:text-[6.6rem] tracking-tight cursor-default"
          >
            <ScrambleChars text={hero.headlineLine1} className="block" />

            <span className="relative block overflow-hidden">
              <span aria-hidden="true" className="invisible block">
                {rotations[0].line2}
                <br />
                {rotations[0].line3}
              </span>

              <span
                className="absolute inset-0 block transition-opacity ease-out"
                style={{
                  opacity: isFading ? 0 : 1,
                  transitionDuration: `${FADE_DURATION}ms`,
                }}
              >
                <ScrambleChars text={line2Text} className="text-outline" />
                {line3Text || line2Text.length === 0 ? <br /> : null}
                <span className="text-vermilion">
                  <ScrambleChars text={line3Text} />
                  {showCursor && (
                    <span
                      aria-hidden="true"
                      className="typewriter-cursor inline-block w-[0.06em] ml-1 -mb-1 h-[0.85em] bg-vermilion align-middle"
                    />
                  )}
                </span>
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-4 sm:mt-6"
          >
            <p className="max-w-md text-paper text-sm sm:text-base font-black normal-case">{hero.subhead}</p>

            <div className="flex flex-wrap items-center gap-3">
              <TransitionLink
                to="/contact"
                label="Contact"
                className="inline-flex items-center gap-3 rounded-full bg-paper text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-sunflower transition-colors"
              >
                Book a free audit
                <span aria-hidden>→</span>
              </TransitionLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
