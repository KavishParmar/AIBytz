import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import content from "../content/site.json";

function useViewportWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ─── Zoom intro: PROCESS word zooms into the O and fades, revealing the
       timeline page behind it. Pinned for a short scroll distance only. ─── */

function ZoomIntro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Word grows and fades out across the first ~70% of this short section.
     Keep scale modest (1→6) so it reads as "zoom into the O" without
     turning into a giant colored blob. */
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 6]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? "hidden" : "visible"));

  return (
    <div ref={ref} className="relative h-[180vh] bg-ink-soft">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink-soft flex items-center justify-center">
        <motion.h2
          className="font-display uppercase text-[11vw] lg:text-[9rem] tracking-tight text-paper leading-none whitespace-nowrap select-none"
          style={{ scale, opacity, visibility, transformOrigin: "42.5% 50%" }}
        >
          PR<span className="text-vermilion">O</span>CESS
        </motion.h2>
      </div>
    </div>
  );
}

/* ─── A single card in the scrollable timeline ─── */

function CardBox({ step }) {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-[#e8e6e0]">
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-vermilion text-white font-mono text-sm font-bold shrink-0">
          {step.n}
        </span>
        <h3 className="font-display uppercase text-lg lg:text-xl leading-tight text-paper">
          {step.title}
        </h3>
      </div>
      <p className="font-sans text-sm leading-relaxed text-[#555]">{step.body}</p>
    </div>
  );
}

/* ─── Desktop timeline: normal scrollable section, cards animate in as you
       scroll past each one (no pinning, no cramming into one screen). ─── */

function DesktopTimeline() {
  const steps = content.process.steps;

  return (
    <section id="process" className="bg-ink-soft pt-24 pb-28 lg:pt-28 lg:pb-36">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        {/*
          Layout: each step row = [left-cell] [center-col] [right-cell]
          The center column stacks: dot → line-segment → dot → line-segment → ...
          This means the line is naturally bounded between dot 1 and dot 4.
          No absolute positioning needed for the line.
        */}
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const isLast = i === steps.length - 1;
            return (
              <div key={step.n} className="flex items-stretch">

                {/* Left card cell */}
                <div className="flex-1 flex items-center justify-end pr-10 py-8 lg:py-10">
                  {side === "left" ? (
                    <motion.div
                      initial={{ opacity: 0, x: -140 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full max-w-[420px]"
                    >
                      <CardBox step={step} />
                    </motion.div>
                  ) : (
                    <div className="w-full max-w-[420px]" />
                  )}
                </div>

                {/* Center column: dot + connector arm + line down to next dot */}
                <div className="w-6 shrink-0 flex flex-col items-center">
                  {/* Top half of row — empty space above dot */}
                  <div className="flex-1" />

                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative w-4 h-4 rounded-full bg-vermilion border-[3px] border-ink-soft z-10 shrink-0"
                  >
                    {/* Connector arm to card */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className={`absolute top-[3px] h-[2px] bg-vermilion/60 w-10 ${
                        side === "left"
                          ? "right-[14px] origin-right"
                          : "left-[14px] origin-left"
                      }`}
                    />
                  </motion.div>

                  {/* Line segment going down to next dot (not on last step) */}
                  {!isLast ? (
                    <div className="w-[3px] flex-1 bg-vermilion/40" />
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>

                {/* Right card cell */}
                <div className="flex-1 flex items-center pl-10 py-8 lg:py-10">
                  {side === "right" ? (
                    <motion.div
                      initial={{ opacity: 0, x: 140 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full max-w-[420px]"
                    >
                      <CardBox step={step} />
                    </motion.div>
                  ) : (
                    <div className="w-full max-w-[420px]" />
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DesktopProcess() {
  return (
    <>
      <ZoomIntro />
      <DesktopTimeline />
    </>
  );
}

/* ─── Mobile ─── */

function MobileProcess() {
  const steps = content.process.steps;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 5]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? "hidden" : "visible"));

  return (
    <>
      <div ref={ref} className="relative h-[150vh] bg-ink-soft">
        <div className="sticky top-0 h-screen overflow-hidden bg-ink-soft flex items-center justify-center">
          <motion.h2
            className="font-display uppercase text-[16vw] tracking-tight text-paper leading-none whitespace-nowrap select-none"
            style={{ scale, opacity, visibility, transformOrigin: "42.5% 50%" }}
          >
            PR<span className="text-vermilion">O</span>CESS
          </motion.h2>
        </div>
      </div>

      <section id="process" className="bg-ink-soft px-4 sm:px-6 pt-10 pb-16">
        <div className="mx-auto max-w-[600px]">
          <div className="relative pl-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-paper/15" />
            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.3 }}
                    className="absolute -left-8 top-6 w-6 h-6 flex items-center justify-center"
                  >
                    <div className="w-3 h-3 rounded-full bg-vermilion border-[3px] border-ink-soft" />
                  </motion.div>
                  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#e8e6e0]">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-vermilion text-white font-mono text-sm font-bold mb-3">
                      {step.n}
                    </span>
                    <h3 className="font-display uppercase text-lg sm:text-xl leading-tight text-paper mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-[#555]">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Process() {
  const vw = useViewportWidth();
  return vw >= 1040 ? <DesktopProcess /> : <MobileProcess />;
}
