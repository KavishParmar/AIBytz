import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "../content/site.json";

gsap.registerPlugin(ScrollTrigger);

function useViewportWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function ZoomIntro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
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

function CareerTimeline() {
  const sectionRef = useRef(null);
  const steps = content.process.steps;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const timelineEl = section.querySelector(".career-timeline");
        const dot = section.querySelector(".career-dot");

        // Grow the line as section scrolls into view
        gsap.fromTo(
          timelineEl,
          { maxHeight: "0%" },
          {
            maxHeight: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );

        // Dot appears with line
        gsap.fromTo(
          dot,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 60%",
              scrub: 0.5,
            },
          }
        );

        // Cards animate in when they enter the viewport
        section.querySelectorAll(".career-info-box").forEach((box) => {
          const isRight = box.classList.contains("career-right");
          gsap.fromTo(
            box,
            { opacity: 0, x: isRight ? 280 : -280, scale: 0.85 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        ScrollTrigger.refresh();
      }, section);
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="career-section bg-ink-soft pt-24 pb-28 lg:pt-28 lg:pb-36 relative"
    >
      <div className="career-info">
        <div className="career-timeline">
          <div className="career-dot" />
        </div>

        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={step.n} className="career-info-row">
              <div className="career-info-row-left">
                {isLeft && (
                  <div className="career-info-box career-left">
                    <div className="career-info-box-inner">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-vermilion text-ink font-mono text-sm font-bold shrink-0">
                          {step.n}
                        </span>
                        <h3 className="font-display uppercase text-lg lg:text-xl leading-tight text-paper">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-sans text-sm leading-relaxed text-[#555]">{step.body}</p>
                    </div>
                    <div className="career-info-box-arm" />
                  </div>
                )}
              </div>

              <div className="career-info-row-right">
                {!isLeft && (
                  <div className="career-info-box career-right">
                    <div className="career-info-box-inner">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-vermilion text-ink font-mono text-sm font-bold shrink-0">
                          {step.n}
                        </span>
                        <h3 className="font-display uppercase text-lg lg:text-xl leading-tight text-paper">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-sans text-sm leading-relaxed text-[#555]">{step.body}</p>
                    </div>
                    <div className="career-info-box-arm" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MobileProcess() {
  const steps = content.process.steps;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 5]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? "hidden" : "visible"));

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const timelineEl = section.querySelector(".career-timeline");
        const dot = section.querySelector(".career-dot");

        gsap.fromTo(timelineEl, { maxHeight: "0%" }, {
          maxHeight: "100%", ease: "none",
          scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%", scrub: 0.5 },
        });
        gsap.fromTo(dot, { opacity: 0, scale: 0 }, {
          opacity: 1, scale: 1,
          scrollTrigger: { trigger: section, start: "top 80%", end: "top 60%", scrub: 0.5 },
        });

        section.querySelectorAll(".career-info-box").forEach((box) => {
          gsap.fromTo(box, { opacity: 0, x: 60, scale: 0.9 }, {
            opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: box, start: "top 85%", toggleActions: "play none none reverse" },
          });
        });

        ScrollTrigger.refresh();
      }, section);
    }, 150);

    return () => { clearTimeout(timer); ctx?.revert(); };
  }, []);

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

      <section ref={sectionRef} id="process" className="career-section career-section-mobile bg-ink-soft px-4 sm:px-6 pt-10 pb-16">
        <div className="career-info career-info-mobile">
          <div className="career-timeline"><div className="career-dot" /></div>
          {steps.map((step) => (
            <div key={step.n} className="career-info-box career-right mb-8">
              <div className="career-info-box-inner">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-vermilion text-ink font-mono text-sm font-bold shrink-0">
                    {step.n}
                  </span>
                  <h3 className="font-display uppercase text-lg sm:text-xl leading-tight text-paper">{step.title}</h3>
                </div>
                <p className="font-sans text-sm leading-relaxed text-[#555]">{step.body}</p>
              </div>
              <div className="career-info-box-arm" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function Process() {
  const vw = useViewportWidth();
  return vw >= 1040 ? <><ZoomIntro /><CareerTimeline /></> : <MobileProcess />;
}
