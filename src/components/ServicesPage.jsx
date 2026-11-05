import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";
import ClickBurst from "./ClickBurst";

// ─── service data ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    slug: "ai-automations",
    n: "01",
    title: "AI-Powered Custom Automations",
    tagline: "Your ops on autopilot.",
    description:
      "Businesses lose hours every week to repetitive tasks. We build custom automation systems that handle your operations around the clock — so your team focuses on what actually matters.",
    subheading: "What We Automate",
    points: [
      "CRM & Pipeline Syncing",
      "Operations & Backend Workflows",
      "Data Entry & Report Generation",
      "Email & Follow-Up Sequences",
    ],
  },
  {
    slug: "ai-employees",
    n: "02",
    title: "Pre-Trained AI Employees",
    tagline: "A new hire that never sleeps.",
    description:
      "Deploy AI agents that are ready to work from day one. Trained on your business data, they handle real conversations, qualify leads, and manage appointments — like a new hire that never sleeps.",
    subheading: "Roles We Fill",
    points: [
      "AI Sales Assistant",
      "AI Customer Support Agent",
      "AI Appointment Scheduler",
      "AI Lead Qualifier",
    ],
  },
  {
    slug: "ai-chatbots",
    n: "03",
    title: "AI Chatbots & Web Integration",
    tagline: "Always on, always helpful.",
    description:
      "Smart chatbots embedded directly into your website, WhatsApp, or social channels. They answer questions, capture leads, and guide visitors — trained specifically on your products and services.",
    subheading: "Where We Deploy",
    points: [
      "Website Live Chat Widgets",
      "WhatsApp & Instagram Bots",
      "Knowledge-Base Assistants",
      "Multi-Channel Integration",
    ],
  },
];

const ICONS = [
  // Automation
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
  // AI Employee
  <svg key="ic2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
    <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="21" cy="13" r="1.5" fill="currentColor" />
    <circle cx="27" cy="13" r="1.5" fill="currentColor" />
    <path d="M20 17c0 0 2 2.5 4 2.5s4-2.5 4-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="32" y="4" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M36 8.5h4M36 11.5h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Chatbot
  <svg key="ic3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 12a6 6 0 016-6h24a6 6 0 016 6v16a6 6 0 01-6 6H20l-8 7V34h-1a6 6 0 01-5-6V12z" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="16" cy="20" r="2" fill="currentColor" />
    <circle cx="24" cy="20" r="2" fill="currentColor" />
    <circle cx="32" cy="20" r="2" fill="currentColor" />
    <path d="M38 3l1.5 3.5L43 8l-3.5 1.5L38 13l-1.5-3.5L33 8l3.5-1.5L38 3z" fill="currentColor" />
  </svg>,
];

// ─── comparison data ───────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  { label: "Cost per month",       traditional: "$3,000 – $8,000 (staff)", ai: "Flat monthly retainer" },
  { label: "Availability",         traditional: "9–5, weekdays only",      ai: "24 / 7 / 365" },
  { label: "Onboarding time",      traditional: "Weeks to months",         ai: "Days" },
  { label: "Scales with volume",   traditional: "Hire more people",        ai: "One click" },
  { label: "Consistent output",    traditional: "Varies by mood & energy", ai: "Always identical" },
  { label: "Learns your business", traditional: "Eventually",              ai: "Trained from day one" },
];

// second comparison — hiring in-house / typical agency vs AIBytz
const AGENCY_FLUFF = [
  { head: "Months to get going", body: "Job posts, interviews, and onboarding before a single task gets handled." },
  { head: "Salaries + overhead", body: "Wages, benefits, software seats, and management time stacking up every month." },
  { head: "Knowledge walks out", body: "When someone quits, everything they learned about your process leaves with them." },
  { head: "Capped by headcount", body: "More volume means more hiring — and you pay for the slow weeks too." },
  { head: "You chase the work", body: "Tasks still need assigning, reminding, and checking. You stay the bottleneck." },
];

const VAANTA_REAL = [
  { head: "Live in days", body: "We map, build, and switch it on in days — not quarters of recruiting." },
  { head: "One flat fee", body: "A single predictable retainer that replaces the whole cost stack of a hire." },
  { head: "Knowledge stays put", body: "Your workflows live in the system. Nothing leaves, nothing gets forgotten." },
  { head: "Scales instantly", body: "Handle 10 or 10,000 tasks at the same cost — up or down, on demand." },
  { head: "It runs itself", body: "Work gets picked up, done, and logged automatically. You just watch results." },
];

// ─── service card ──────────────────────────────────────────────────────────────

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group flex flex-col bg-white rounded-2xl border border-[#e0ddd6] p-7 sm:p-8 h-full hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
      >
        {/* icon + number */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 text-vermilion">{ICONS[index]}</div>
          <span className="font-mono text-sm text-[#999] tracking-wide">
            {service.n} / {String(SERVICES.length).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display uppercase text-xl sm:text-2xl leading-tight text-paper mb-2">
          {service.title}
        </h3>

        <p className="font-mono text-xs uppercase tracking-[0.18em] text-vermilion mb-4">
          {service.tagline}
        </p>

        <p className="font-sans text-sm sm:text-[0.925rem] leading-relaxed text-[#555] mb-6">
          {service.description}
        </p>

        <div className="h-px bg-[#e5e3dc] mb-5" />

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion mb-3">
          {service.subheading}:
        </p>

        <ul className="flex flex-col gap-2.5 mb-8">
          {service.points.map((pt) => (
            <li key={pt} className="flex items-center gap-2.5 font-sans text-sm text-paper">
              <span className="w-2 h-2 rounded-full bg-vermilion shrink-0" />
              {pt}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 font-display uppercase text-sm tracking-wide text-vermilion group-hover:gap-3 transition-all duration-300">
            See full details
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── comparison section ────────────────────────────────────────────────────────

function Comparison() {
  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* heading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
        >
          Why switch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display uppercase text-[9vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-4"
        >
          Traditional vs <span className="text-vermilion">AI</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
        >
          The same work, done differently. See what flipping to AI actually means for your business.
        </motion.p>

        {/* table header */}
        <div className="hidden sm:grid grid-cols-[0.8fr_1.1fr_1.1fr] gap-4 mb-4 px-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">Traditional</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-vermilion">AI (AIBytz)</span>
        </div>

        {/* rows */}
        <div className="flex flex-col gap-px rounded-2xl overflow-hidden border border-[#e0ddd6] shadow-sm">
          {COMPARISON_ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.1fr_1.1fr] gap-0"
            >
              {/* label */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-[#e0ddd6] flex items-center bg-ink">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50">{row.label}</span>
              </div>
              {/* traditional — default site background */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-[#e0ddd6] flex items-center gap-2.5 bg-ink">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[#ccc]">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="font-sans text-sm text-paper/60">{row.traditional}</span>
              </div>
              {/* AI — white */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-2.5 bg-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-vermilion">
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-sans text-sm font-semibold text-paper">{row.ai}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── second comparison: agencies vs AIBytz (two-column fluff/real) ──────────

function AgencyComparison() {
  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* heading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
        >
          Who you hire
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display uppercase text-[9vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-4"
        >
          Agencies vs <span className="text-vermilion">Us</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
        >
          Before you sign another big monthly retainer for slides and status calls, take an honest
          look at what you're actually paying for.
        </motion.p>

        {/* two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* fluff column — gray */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#e0ddd6] bg-[#f1efea] p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40 mb-6">
              Hiring in-house or a typical agency
            </p>
            <ul className="flex flex-col gap-5">
              {AGENCY_FLUFF.map((item) => (
                <li key={item.head} className="flex items-start gap-3.5">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 mt-0.5 text-paper/30">
                    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="font-sans text-sm sm:text-[0.95rem] leading-relaxed">
                    <span className="font-display uppercase tracking-wide text-paper/70 block mb-0.5">{item.head}</span>
                    <span className="text-paper/50">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* real column — white */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-[#e0ddd6] bg-white p-6 sm:p-8 shadow-sm"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion mb-6">
              AIBytz
            </p>
            <ul className="flex flex-col gap-5">
              {VAANTA_REAL.map((item) => (
                <li key={item.head} className="flex items-start gap-3.5">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 mt-0.5 text-green-600">
                    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 11l3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-sans text-sm sm:text-[0.95rem] leading-relaxed">
                    <span className="font-display uppercase tracking-wide text-paper block mb-0.5">{item.head}</span>
                    <span className="text-paper/60">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── audit detail band — "what the free audit covers" ────────────────────────

const AUDIT_STEPS = [
  { head: "We map your stack", body: "We look at the tools you already run and how they talk to each other today." },
  { head: "We trace the waste", body: "We find exactly where your team is losing hours to manual, repetitive work." },
  { head: "You get a blueprint", body: "A clear plan of what to automate first, what it costs, and what it saves." },
];

function AuditBand() {
  return (
    <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
        >
          No risk, no pitch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display uppercase text-[11vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-6 max-w-4xl"
        >
          Stop repeating tasks.
          <br />
          Start <span className="text-vermilion">delegating</span> to bots.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
        >
          Book a free audit and we'll show you exactly where the time is going — before you commit to anything.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {AUDIT_STEPS.map((step, i) => (
            <motion.div
              key={step.head}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#e0ddd6] p-7"
            >
              <span className="font-display text-5xl text-vermilion/90 leading-none block mb-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display uppercase text-lg text-paper mb-2">{step.head}</h3>
              <p className="font-sans text-sm text-paper/60 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── strategy CTA (copied from StrategyCTA, text swapped) ─────────────────────

function ServicesCTA() {
  return (
    <section
      className="relative overflow-hidden bg-vermilion px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-24 sm:py-32 lg:py-40"
    >
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
          Pick Your
          <br />
          Service<span className="text-paper">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-12 flex flex-col gap-1"
        >
          <p className="text-white text-lg sm:text-xl font-semibold">
            Not sure which service fits? Let's figure it out together.
          </p>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            30 minutes, no pitch deck — just a clear picture of what's possible for your business.
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

// ─── page ──────────────────────────────────────────────────────────────────────

function ServicesPageContent() {
  return (
    <>
      <SEO
        title="Services | AIBytz — AI Employees & Automation"
        description="Explore AIBytz's three core services: AI-powered automations, pre-trained AI employees, and AI chatbot integration. Choose the right fit and book a free call."
        path="/services"
      />
      <Nav />
      <main>
        {/* ── Hero intro ───────────────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-36 sm:pt-44 pb-16 sm:pb-20">
          <div className="mx-auto max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-5"
            >
              What we do
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display uppercase text-[14vw] sm:text-8xl lg:text-9xl leading-[0.88] tracking-tight text-paper mb-6"
            >
              Our
              <br />
              Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-2xl text-paper/60 text-base sm:text-lg leading-relaxed"
            >
              Three focused offerings, each built around one idea: remove the work that steals your
              time and replace it with AI that never stops. Pick the one that fits — or we'll help
              you figure it out.
            </motion.p>
          </div>
        </section>

        {/* ── Service cards ─────────────────────────────────────────────── */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison 1: Traditional vs AI ───────────────────────────── */}
        <Comparison />

        {/* ── Comparison 2: Agencies vs Us ──────────────────────────────── */}
        <AgencyComparison />

        {/* ── Audit detail band ─────────────────────────────────────────── */}
        <AuditBand />

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <DarkOutro>
          <ServicesCTA />
          <Footer />
        </DarkOutro>
      </main>
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesPageContent />
      <ClickBurst />
    </>
  );
}
