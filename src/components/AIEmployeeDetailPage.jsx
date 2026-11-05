import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";
import ClickBurst from "./ClickBurst";
import { AI_EMPLOYEES } from "./AIEmployeesPage";

const BY_SLUG = Object.fromEntries(AI_EMPLOYEES.map((e) => [e.slug, e]));

function DetailCTA() {
  return (
    <section className="relative overflow-hidden bg-vermilion px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.07]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-black/[0.06]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-white/70 mb-6"
        >
          Free 30-minute session
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-[15vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-tight text-white mb-8 sm:mb-10"
        >
          Let's Get
          <br />
          Started<span className="text-paper">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-12 flex flex-col gap-1"
        >
          <p className="text-white text-lg sm:text-xl font-semibold">
            Book a free strategy session and see this AI employee in action.
          </p>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            No fluff, no sales pitch — just a clear demonstration of what's possible for your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 rounded-full bg-white text-vermilion px-10 py-5 sm:px-14 sm:py-6 font-mono text-sm sm:text-base uppercase tracking-widest font-bold hover:bg-paper hover:text-ink transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          >
            Book a Strategy Call
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>

          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            &#9679;&ensp;Available globally&ensp;&#9679;
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function EmployeeDetailContent({ slug }) {
  const emp = BY_SLUG[slug];
  const idx = AI_EMPLOYEES.indexOf(emp);
  const next = AI_EMPLOYEES[(idx + 1) % AI_EMPLOYEES.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <SEO
        title={`${emp.name} — ${emp.role} AI Employee | AIBytz`}
        description={emp.objective}
        path={`/ai-employees/${slug}`}
      />
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-36 sm:pt-44 pb-16 sm:pb-20">
          <div className="mx-auto max-w-[1400px]">
            <Link
              to="/ai-employees"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-vermilion transition-colors mb-8"
            >
              <span aria-hidden>&larr;</span> All AI Employees
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl bg-gradient-to-b from-[#1a1726] to-[#0f0d14] flex items-center justify-center overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="relative w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                />
                {/* Status */}
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-paper/90 backdrop-blur-sm text-ink rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
                  {emp.status}
                </span>
              </motion.div>

              {/* Info */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion">
                    {emp.role}
                  </span>
                  <span className="font-mono text-xs text-paper/30 tracking-widest">
                    {String(idx + 1).padStart(2, "0")} / {String(AI_EMPLOYEES.length).padStart(2, "0")}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-display uppercase text-[14vw] sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-paper mb-4"
                >
                  {emp.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="max-w-xl text-paper/60 text-base sm:text-lg leading-relaxed italic"
                >
                  &ldquo;{emp.tagline}&rdquo;
                </motion.p>

                {/* Qualities */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex flex-wrap gap-2 mt-6"
                >
                  {emp.qualities.map((q) => (
                    <span
                      key={q}
                      className="inline-flex items-center border border-paper/15 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-wider text-paper/50 uppercase"
                    >
                      {q}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Objective & Experience ────────────────────────────────── */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
                Objective
              </p>
              <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-paper mb-6">
                What {emp.name} does
              </h2>
              <p className="text-paper/70 text-base sm:text-lg leading-relaxed">
                {emp.objective}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
                Experience
              </p>
              <p className="text-paper/70 text-base sm:text-lg leading-relaxed mb-8">
                {emp.experience}
              </p>

              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {emp.coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 bg-white rounded-xl border border-[#e0ddd6] px-4 py-2.5 font-mono text-xs tracking-wider text-paper uppercase"
                  >
                    <span className="w-2 h-2 rounded-full bg-vermilion shrink-0" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── What's included ──────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
              Capabilities
            </p>
            <h2 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-paper mb-14">
              What {emp.name} handles
            </h2>

            <div className="flex flex-col gap-4">
              {emp.what.map((item, i) => {
                const [head, ...rest] = item.split(" — ");
                return (
                  <motion.div
                    key={head}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-4 bg-paper/[0.03] rounded-2xl border border-paper/10 p-5 sm:p-6"
                  >
                    <span className="mt-1 font-display text-2xl text-vermilion/80 leading-none shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display uppercase text-base sm:text-lg text-paper tracking-tight mb-1">
                        {head}
                      </p>
                      {rest.length > 0 && (
                        <p className="font-sans text-sm text-paper/50 leading-relaxed">
                          {rest.join(" — ")}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────────── */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
              What you get
            </p>
            <h2 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-paper mb-14">
              The outcomes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {emp.outcomes.map((o, i) => (
                <motion.div
                  key={o}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-[#e0ddd6] p-6"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 text-vermilion">
                    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 11l3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-display uppercase text-base sm:text-lg text-paper tracking-tight">
                    {o}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Next employee */}
            <div className="mt-20 pt-10 border-t border-[#e0ddd6]">
              <Link
                to={`/ai-employees/${next.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#999]">
                    Next AI employee
                  </span>
                  <p className="font-display uppercase text-2xl sm:text-3xl text-paper group-hover:text-vermilion transition-colors mt-1">
                    {next.name} &mdash; {next.role}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 font-display uppercase text-sm tracking-wide text-vermilion group-hover:gap-4 transition-all duration-300 shrink-0">
                  View profile
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <DarkOutro>
          <DetailCTA />
          <Footer />
        </DarkOutro>
      </main>
    </>
  );
}

export default function AIEmployeeDetailPage() {
  const { slug } = useParams();

  if (!BY_SLUG[slug]) {
    return <Navigate to="/ai-employees" replace />;
  }

  return (
    <>
      <EmployeeDetailContent slug={slug} />
      <ClickBurst />
    </>
  );
}
