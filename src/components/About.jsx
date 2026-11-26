import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import TransitionLink from "./TransitionLink";
import content from "../content/site.json";

function Counter({ to, suffix = "", duration = 1400 }) {
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
  return <span ref={ref}>{val}{suffix}</span>;
}

const agentIcons = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16,6 22,12 16,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="13" y1="4" x2="11" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="2"/>
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4c3.1 0 5.6-2.5 5.6-5.6C22 5.7 17.5 2 12 2z" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="7.5" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="7.5" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="7.5" r="1.5" fill="currentColor"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M9.5 2C7 2 5 4 5 6.5c0 1.2.5 2.3 1.3 3.1C5.5 10.4 5 11.6 5 13c0 2.5 2 4.5 4.5 4.5H12V2H9.5z" stroke="currentColor" strokeWidth="1.5" opacity=".4"/>
      <path d="M14.5 2C17 2 19 4 19 6.5c0 1.2-.5 2.3-1.3 3.1.8.8 1.3 2 1.3 3.4 0 2.5-2 4.5-4.5 4.5H12V2h2.5z" stroke="currentColor" strokeWidth="1.5" opacity=".4"/>
      <circle cx="12" cy="8" r="2" fill="currentColor"/>
      <circle cx="12" cy="14" r="2" fill="currentColor"/>
      <line x1="12" y1="10" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="17.5" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 2c0 0 5 2.5 5 9v3.5l-5 7-5-7V11C7 4.5 12 2 12 2z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity=".1"/>
      <circle cx="12" cy="10" r="2" fill="currentColor"/>
      <path d="M8.5 14.5L6 17M15.5 14.5L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <polyline points="3,20 8,12 12,15 17,7 21,4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="21" cy="4" r="2" fill="currentColor"/>
    </svg>
  ),
};

function PulsingDot({ delay = 0, color = "#ff3b1f" }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0.2, 0.8] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function About() {
  const { about } = content;

  return (
    <section id="about" className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14 flex items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-1">
              {about.eyebrow}
            </p>
            <h2 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-none">
              {about.headingLine1}<br />
              <span className="text-vermilion">{about.headingLine2}</span>
            </h2>
          </div>

          <TransitionLink
            to="/about"
            label="About"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-sunflower transition-colors shrink-0"
          >
            Full story
            <span aria-hidden>&rarr;</span>
          </TransitionLink>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Founder card — wide */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 bg-paper text-ink rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-8 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-mist-dark">Online now</span>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cobalt/20 overflow-hidden shrink-0 ring-2 ring-cobalt/30">
                {about.founder.image && (
                  <img src={about.founder.image} alt={about.founder.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <h3 className="font-display uppercase text-2xl sm:text-3xl leading-tight text-ink">
                  {about.founder.name}
                </h3>
                <p className="font-mono text-[10px] sm:text-xs tracking-widest text-vermilion font-bold mt-0.5">
                  {about.founder.role}
                </p>
              </div>
            </div>
            <p className="text-sm text-mist leading-relaxed mb-5">
              {about.founder.bio}
            </p>
            <div className="mt-auto flex items-center gap-3">
              <a href={about.founder.instagram} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-vermilion hover:text-ink transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {about.founder.linkedin && about.founder.linkedin !== "#" && (
                <a href={about.founder.linkedin} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-cobalt hover:text-ink transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </a>
              )}
            </div>
          </motion.div>

          {/* Agent grid card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-7 bg-white rounded-2xl sm:rounded-[1.75rem] border border-paper/[0.07] p-6 sm:p-8 hover:border-paper/20 hover:shadow-[0_16px_60px_rgba(0,0,0,0.07)] transition-all duration-400"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-vermilion font-bold">AI Agent Fleet</p>
                <h3 className="font-display uppercase text-xl sm:text-2xl leading-tight mt-1">The team behind the team</h3>
              </div>
              <div className="relative w-8 h-8">
                <PulsingDot delay={0} color="#ff3b1f" />
                <PulsingDot delay={0.5} color="#7ad100" />
                <PulsingDot delay={1} color="#8b5cff" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {about.agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="bg-ink rounded-xl p-4 flex flex-col items-center text-center group hover:bg-paper hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
                >
                  <div className="w-8 h-8 text-vermilion mb-2 group-hover:text-ink transition-colors">
                    {agentIcons[agent.icon]}
                  </div>
                  <span className="font-display uppercase text-xs sm:text-sm text-paper group-hover:text-ink transition-colors">
                    {agent.name}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-mist mt-0.5 group-hover:text-mist-dark transition-colors">
                    {agent.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats row */}
          {about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
              className="lg:col-span-3 bg-white rounded-2xl border border-paper/[0.07] p-5 sm:p-6 flex flex-col items-center text-center hover:border-vermilion/30 transition-colors duration-300"
            >
              <span className="font-display text-4xl sm:text-5xl text-paper leading-none">
                <Counter to={stat.value} suffix={stat.suffix} duration={1200 + i * 200} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-mist mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 sm:hidden"
        >
          <TransitionLink
            to="/about"
            label="About"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-paper text-ink px-6 py-4 text-sm font-mono uppercase tracking-widest hover:bg-sunflower transition-colors"
          >
            Full story
            <span aria-hidden>&rarr;</span>
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
