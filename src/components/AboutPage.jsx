import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import content from "../content/site.json";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import ServicesStrap from "./ServicesStrap";
import DarkOutro from "./DarkOutro";
import { ProjectFormProvider } from "./ProjectFormContext";
import ProjectFormModal from "./ProjectFormModal";

const TYPE_SPEED = 55;
const HOLD_DURATION = 1400;
const FADE_DURATION = 400;

function useTypewriterWord(words, reduceMotion) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [phase, setPhase] = useState("hold");
  const timeoutRef = useRef(null);
  const current = words[index];

  useEffect(() => {
    if (reduceMotion || words.length < 2) return undefined;
    if (phase === "typing") {
      if (length < current.length) {
        timeoutRef.current = setTimeout(() => setLength((l) => l + 1), TYPE_SPEED);
      } else {
        setPhase("hold");
      }
    } else if (phase === "hold") {
      timeoutRef.current = setTimeout(() => setPhase("fading"), HOLD_DURATION);
    } else if (phase === "fading") {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setLength(0);
        setPhase("typing");
      }, FADE_DURATION);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [phase, length, current, reduceMotion, words.length]);

  const displayed = reduceMotion ? current : current.slice(0, length);
  return { text: displayed, isFading: phase === "fading", showCursor: !reduceMotion && words.length > 1 };
}

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

function AgentOrbitViz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const agents = content.about.agents;
  const CX = 160, CY = 140, R = 100;

  return (
    <div ref={ref} className="w-full flex items-center justify-center">
      <svg viewBox="0 0 320 280" className="w-full max-w-[480px]">
        <motion.circle cx={CX} cy={CY} r={R} fill="none"
          stroke="#14121a" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }} />
        <motion.circle cx={CX} cy={CY} r={R * 0.5} fill="none"
          stroke="#14121a" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} />

        {agents.map((agent, i) => {
          const angle = (i / agents.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = CX + R * Math.cos(rad);
          const y = CY + R * Math.sin(rad);
          const lx = CX + (R + 30) * Math.cos(rad);
          const ly = CY + (R + 30) * Math.sin(rad);
          const colors = ["#ff3b1f", "#7ad100", "#8b5cff", "#2b5eff", "#ffcc33", "#ff3b1f"];
          const color = colors[i % colors.length];

          return (
            <motion.g key={agent.name}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              style={{ transformOrigin: `${x}px ${y}px` }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <line x1={CX} y1={CY} x2={x} y2={y} stroke={color} strokeOpacity="0.15" strokeWidth="1.5" />
              <circle cx={x} cy={y} r={14} fill={color} fillOpacity="0.08" />
              <circle cx={x} cy={y} r={8} fill={color} />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fill="#14121a" opacity="0.6" fontFamily="JetBrains Mono, monospace"
                letterSpacing="0.05em">
                {agent.name.toUpperCase()}
              </text>
            </motion.g>
          );
        })}

        <motion.circle cx={CX} cy={CY} r={28} fill="#14121a"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
        <text x={CX} y={CY - 6} textAnchor="middle" dominantBaseline="middle"
          fontSize="8" fill="#fdf8ec" fontFamily="Anton, sans-serif" letterSpacing="1">KAVISH</text>
        <text x={CX} y={CY + 6} textAnchor="middle" dominantBaseline="middle"
          fontSize="6.5" fill="#ff3b1f" fontFamily="JetBrains Mono, monospace" opacity="0.9">ENGINEER</text>
      </svg>
    </div>
  );
}

function TerminalLog() {
  const lines = [
    { time: "09:01", agent: "Builder", action: "Deployed client chatbot v2.3", color: "text-acid" },
    { time: "09:14", agent: "Researcher", action: "Analyzed competitor pricing model", color: "text-cobalt" },
    { time: "09:22", agent: "Designer", action: "Generated 4 landing page variants", color: "text-violet" },
    { time: "09:38", agent: "Strategist", action: "Mapped CRM automation workflow", color: "text-sunflower" },
    { time: "09:45", agent: "Deployer", action: "Zero-downtime migration complete", color: "text-vermilion" },
    { time: "09:52", agent: "Optimizer", action: "A/B test conversion up 34%", color: "text-acid" },
    { time: "10:01", agent: "Builder", action: "WhatsApp bot trained on new data", color: "text-acid" },
    { time: "10:09", agent: "Kavish", action: "Client call — scoped Phase 2", color: "text-ink" },
  ];

  return (
    <div className="bg-paper rounded-xl sm:rounded-2xl p-5 sm:p-6 font-mono text-[11px] sm:text-xs overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-vermilion" />
        <span className="w-2.5 h-2.5 rounded-full bg-sunflower" />
        <span className="w-2.5 h-2.5 rounded-full bg-acid" />
        <span className="text-mist ml-2 text-[10px] tracking-widest uppercase">agent_activity.log</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="flex items-start gap-3"
          >
            <span className="text-mist shrink-0">{line.time}</span>
            <span className={`${line.color} shrink-0 w-20 sm:w-24 text-right`}>[{line.agent}]</span>
            <span className="text-ink">{line.action}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-3 flex items-center gap-1 text-mist"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>▊</span>
        <span className="text-[10px]">agents running...</span>
      </motion.div>
    </div>
  );
}

function ComparisonSection() {
  const rows = [
    { metric: "Team size", traditional: "8–15 people", vaanta: "1 engineer + AI agents" },
    { metric: "Delivery time", traditional: "2–4 months", vaanta: "1–3 weeks" },
    { metric: "Coordination overhead", traditional: "40% of time", vaanta: "0%" },
    { metric: "Available hours", traditional: "8hrs/day", vaanta: "24/7" },
    { metric: "Context loss", traditional: "Every handoff", vaanta: "Never" },
    { metric: "Cost", traditional: "$$$$$", vaanta: "$$" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b-2 border-paper/20">
            <th className="text-left font-mono text-[10px] uppercase tracking-widest text-mist py-3 pr-4" />
            <th className="text-center font-mono text-[10px] uppercase tracking-widest text-mist py-3 px-4">Traditional Agency</th>
            <th className="text-center font-mono text-[10px] uppercase tracking-widest text-vermilion font-bold py-3 px-4">AIBytz</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.metric}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-paper/8"
            >
              <td className="py-3 pr-4 font-sans text-sm text-paper font-medium">{row.metric}</td>
              <td className="py-3 px-4 text-center font-mono text-xs text-mist">{row.traditional}</td>
              <td className="py-3 px-4 text-center font-mono text-xs text-paper font-bold bg-vermilion/5 rounded">{row.vaanta}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TechStackPills() {
  const { techStack } = content.aboutPage;
  return (
    <div className="flex flex-wrap gap-3">
      {techStack.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="bg-paper rounded-full px-5 py-3 flex items-center gap-3 group hover:bg-vermilion transition-colors duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-vermilion group-hover:bg-ink transition-colors" />
          <div>
            <span className="font-display uppercase text-sm text-ink group-hover:text-ink transition-colors">{item.label}</span>
            <span className="font-mono text-[9px] text-mist group-hover:text-ink/70 ml-2 transition-colors">{item.detail}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AboutPageContent() {
  const { aboutPage, about } = content;
  const reduceMotion = useReducedMotion();
  const { text: headingText, isFading, showCursor } = useTypewriterWord(
    aboutPage.headingRotations, reduceMotion
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="About AIBytz | One AI Engineer, Infinite Agents"
        description="AIBytz is an AI automation studio run by one AI engineer and a fleet of AI agents. No bloated teams — just raw execution at machine speed."
        path="/about"
      />
      <Nav />

      <main>
        {/* Hero */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-32 lg:pt-40 pb-10 sm:pb-16">
          <div className="mx-auto max-w-[1400px]">
            <Link to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mist-dark hover:text-mist transition-colors mb-8">
              <span aria-hidden>&larr;</span> Back home
            </Link>

            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-3">
              {aboutPage.eyebrow}
            </p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display uppercase text-[12vw] sm:text-[8.5vw] lg:text-[6.6rem] leading-[0.9] tracking-tight"
            >
              {aboutPage.headingLine1}
              <br />
              <span className="relative block overflow-hidden">
                <span aria-hidden="true" className="invisible block">
                  {aboutPage.headingRotations.reduce((a, b) => (a.length >= b.length ? a : b))}
                </span>
                <span
                  className="absolute inset-0 block transition-opacity ease-out text-vermilion"
                  style={{ opacity: isFading ? 0 : 1, transitionDuration: `${FADE_DURATION}ms` }}
                >
                  {headingText}
                  {showCursor && (
                    <span aria-hidden="true"
                      className="typewriter-cursor inline-block w-[0.06em] ml-1 -mb-1 h-[0.85em] bg-vermilion align-middle" />
                  )}
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-2xl text-mist text-base sm:text-lg leading-relaxed mt-6 sm:mt-8"
            >
              {aboutPage.intro}
            </motion.p>
          </div>
        </section>

        <ServicesStrap />

        {/* Manifesto */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-12 sm:mb-16"
            >
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-2">How it works</p>
              <h2 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-none">
                {aboutPage.manifesto.heading}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {aboutPage.manifesto.points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-white rounded-2xl border border-paper/[0.07] p-7 sm:p-8 hover:border-paper/20 hover:shadow-[0_16px_60px_rgba(0,0,0,0.07)] transition-all duration-400 group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-vermilion font-bold">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display uppercase text-2xl sm:text-3xl leading-tight mt-3 mb-4 group-hover:text-vermilion transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sm text-mist leading-relaxed">{point.body}</p>
                  <div className="absolute top-7 right-7 font-display text-[4rem] leading-none text-paper/[0.04]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agent orbit + terminal */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-20 lg:py-28 bg-ink/[0.03]">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-10 sm:mb-14 text-center"
            >
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-2">The Fleet</p>
              <h2 className="font-display uppercase text-4xl sm:text-6xl leading-none">
                Meet the <span className="text-vermilion">agents</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <AgentOrbitViz />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <TerminalLog />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats banner */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="bg-paper rounded-2xl sm:rounded-[1.75rem] p-8 sm:p-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-center"
                >
                  <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-none">
                    <Counter to={stat.value} suffix={stat.suffix} duration={1400 + i * 200} />
                  </span>
                  <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-mist-dark mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-10 sm:mb-14"
            >
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-2">The difference</p>
              <h2 className="font-display uppercase text-4xl sm:text-6xl leading-none">
                Agency <span className="text-outline">vs</span> AIBytz
              </h2>
            </motion.div>
            <ComparisonSection />
          </div>
        </section>

        {/* Three pillars */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {aboutPage.sections.map((section, i) => (
                <motion.div
                  key={section.heading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-t-2 border-vermilion/40 pt-5 hover:border-vermilion transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-vermilion font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display uppercase text-xl sm:text-2xl mb-3 mt-2">
                    {section.heading}
                  </h2>
                  <p className="text-mist text-sm leading-relaxed">{section.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The founder */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-20 lg:py-28 bg-ink/[0.03]">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-10 sm:mb-14 text-center"
            >
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-2">The operator</p>
              <h2 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-none">
                {about.founder.name.split(" ")[0]} <span className="text-vermilion">{about.founder.name.split(" ").slice(1).join(" ")}</span>
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm"
              >
                <div className="aspect-[3/4] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-paper shadow-[0_12px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
                  {about.founder.image && (
                    <img src={about.founder.image} alt={about.founder.name}
                      className="w-full h-full object-cover" />
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1"
              >
                <h3 className="font-display uppercase text-3xl sm:text-4xl leading-tight mb-2">
                  {about.founder.name}
                </h3>
                <p className="font-mono text-xs sm:text-sm tracking-widest text-vermilion font-bold uppercase mb-5">
                  {about.founder.role}
                </p>
                <p className="text-mist text-base sm:text-lg leading-relaxed mb-6">
                  {about.founder.bio}
                </p>
                <p className="text-mist text-sm leading-relaxed mb-8">
                  Runs every client engagement from first call to launch. Designs the AI architecture,
                  commands the agent fleet, and makes sure every system works the way your business
                  actually runs — not the way a template assumes it does.
                </p>

                <div className="flex items-center gap-3 mb-8">
                  <a href={about.founder.instagram} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink hover:bg-vermilion transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="5"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href={about.founder.linkedin} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink hover:bg-cobalt transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                    </svg>
                  </a>
                </div>

                <TechStackPills />
              </motion.div>
            </div>
          </div>
        </section>

        <DarkOutro>
          <Footer />
        </DarkOutro>
      </main>

      <ProjectFormModal />
    </>
  );
}

export default function AboutPage() {
  return (
    <ProjectFormProvider>
      <AboutPageContent />
    </ProjectFormProvider>
  );
}
