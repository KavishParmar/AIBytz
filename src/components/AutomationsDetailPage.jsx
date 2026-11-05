import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";
import ClickBurst from "./ClickBurst";

// ─── automation service cards ───────────────────────────────────────────────

const AUTOMATIONS = [
  {
    id: "lead-capture",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12 42c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 8l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 11h8a3 3 0 013 3v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Lead Capture & CRM Sync",
    summary:
      "Every new lead from your website, ads, or landing pages is instantly captured, enriched, and pushed into your CRM — tagged, scored, and ready for follow-up.",
    details: [
      "Auto-capture from forms, chatbots, and ad platforms",
      "Instant CRM entry with contact enrichment and tagging",
      "Lead scoring based on source, behaviour, and fit",
      "Duplicate detection and merge to keep your pipeline clean",
      "Real-time Slack or email alerts for high-priority leads",
    ],
  },
  {
    id: "follow-up",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18l18 10 18-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="12" r="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" />
        <path d="M36 12h4M38 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Smart Follow-Up Sequences",
    summary:
      "No lead goes cold. Automated email and WhatsApp sequences fire at the right moment — personalised based on what each prospect did or didn't do.",
    details: [
      "Multi-channel follow-ups via email, SMS, and WhatsApp",
      "Behaviour-triggered sequences — opened, clicked, replied, or went silent",
      "Dynamic personalisation using CRM data fields",
      "Time-zone-aware scheduling for optimal open rates",
      "Automatic pause when a lead replies or books a call",
    ],
  },
  {
    id: "appointment",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="8" width="36" height="34" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18h36" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 4v8M32 4v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 28l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Appointment Booking & Reminders",
    summary:
      "Prospects book directly into your calendar. Confirmation emails, reminders, and rescheduling links are sent automatically — no-shows drop, your day stays organised.",
    details: [
      "Calendar integration with Google Calendar, Outlook, or Calendly",
      "Automated booking confirmation with meeting details",
      "Multi-touch reminders — 24 hours, 1 hour, and 15 minutes before",
      "One-click reschedule and cancellation links",
      "Post-meeting follow-up triggered automatically",
    ],
  },
  {
    id: "reporting",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 34V24M22 34V18M30 34V22M38 34V14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    title: "Automated Reporting & Dashboards",
    summary:
      "Daily, weekly, or monthly reports built and delivered without anyone lifting a finger. Pull from your CRM, ad accounts, and tools into one clean view.",
    details: [
      "Scheduled report generation from multiple data sources",
      "Auto-delivered to Slack, email, or Google Sheets",
      "KPI dashboards that update in real time",
      "Custom metrics tailored to your team's goals",
      "Anomaly detection alerts when numbers shift unexpectedly",
    ],
  },
  {
    id: "ops-backend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M11.5 11.5l4.2 4.2M32.3 32.3l4.2 4.2M11.5 36.5l4.2-4.2M32.3 15.7l4.2-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Operations & Backend Workflows",
    summary:
      "The invisible glue between your apps. Data moves, tasks get assigned, and statuses update across every tool your team uses — silently and reliably.",
    details: [
      "Cross-platform data sync between SaaS tools",
      "Automated task creation and assignment in project management apps",
      "Status-change triggers that cascade updates across systems",
      "Error handling and retry logic so nothing gets lost",
      "Audit logs for full visibility into every automated action",
    ],
  },
];

// ─── automation capabilities ────────────────────────────────────────────────

const CAPABILITIES = [
  {
    title: "24/7 Autonomous Operation",
    description:
      "Your automations run around the clock — weekends, holidays, 3 AM. No supervision needed, no missed triggers, no downtime.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
        <path d="M16 8v8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Zero-Friction CRM Syncing",
    description:
      "Leads, deals, and contacts stay perfectly in sync across your CRM and tools. No copy-pasting, no import files, no data entry errors.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M4 16h8l3-8 5 16 3-8h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Backend Process Automation",
    description:
      "From invoice generation to inventory updates to internal notifications — repetitive backend tasks are handled without a single click.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Intelligent Error Recovery",
    description:
      "When something fails upstream, automations don't just break. Built-in retry logic, fallback paths, and alerts keep everything moving.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M4 16a12 12 0 0120.5-8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 16a12 12 0 01-20.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 4v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 28v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Multi-Platform Integration",
    description:
      "We connect the tools you already use — Google Workspace, Slack, HubSpot, GoHighLevel, Notion, Sheets, WhatsApp, and hundreds more.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <circle cx="16" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M14 11.5L10 20.5M18 11.5L22 20.5M12 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Scalable Architecture",
    description:
      "Handle 10 tasks or 10,000 — the same automation scales instantly without additional cost or engineering effort.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M6 28L16 4l10 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── modal ──────────────────────────────────────────────────────────────────

function AutomationModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-2xl border border-[#e0ddd6] shadow-2xl p-7 sm:p-9"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f1efea] flex items-center justify-center text-paper/60 hover:text-vermilion hover:bg-vermilion/10 transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="w-12 h-12 text-vermilion mb-5">{item.icon}</div>
        <h3 className="font-display uppercase text-xl sm:text-2xl text-paper leading-tight mb-3">
          {item.title}
        </h3>
        <p className="text-paper/60 text-sm sm:text-[0.95rem] leading-relaxed mb-6">
          {item.summary}
        </p>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion mb-4">
          What's included
        </p>
        <ul className="flex flex-col gap-3">
          {item.details.map((d) => (
            <li key={d} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-vermilion shrink-0" />
              <span className="text-sm text-paper/70 leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-[#e5e3dc]">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-vermilion font-bold hover:gap-3 transition-all duration-300"
          >
            Get this automated
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── content ────────────────────────────────────────────────────────────────

function AutomationsContent() {
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="AI-Powered Custom Automations | AIBytz Services"
        description="We build custom automation systems that handle your CRM, follow-ups, reporting, and backend ops around the clock. Stop doing it manually — start automating."
        path="/services/ai-automations"
      />
      <Nav />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-36 sm:pt-44 pb-16 sm:pb-20">
          <div className="mx-auto max-w-[1400px]">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/50 hover:text-vermilion transition-colors mb-8"
            >
              <span aria-hidden>&larr;</span> All Services
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-5"
            >
              Service 01 / 03 — Your ops on autopilot.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display uppercase text-[11vw] sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-paper mb-6 max-w-5xl"
            >
              AI-Powered Custom Automations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-2xl text-paper/60 text-base sm:text-lg leading-relaxed mb-10"
            >
              Every business runs on a hundred small tasks that nobody enjoys and everybody has to do.
              We find the ones eating your week and hand them to a system that never forgets, never
              gets tired, and never asks for a day off.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { label: "80%", caption: "Reduction in manual ops" },
                { label: "24/7", caption: "Automated uptime" },
                { label: "0", caption: "Missed follow-ups" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-paper/[0.04] border border-paper/10 rounded-xl px-6 py-4 text-center min-w-[120px]"
                >
                  <span className="font-display text-3xl sm:text-4xl text-vermilion block leading-none mb-1">
                    {stat.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                    {stat.caption}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Automation Services (cards with "See More") ───────────────── */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
            >
              What we automate
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-display uppercase text-[9vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-4"
            >
              Automation <span className="text-vermilion">Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
            >
              We don't sell templates. We map how your business actually runs, then build automation
              flows wired directly into the tools you already use.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {AUTOMATIONS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="flex flex-col bg-white rounded-2xl border border-[#e0ddd6] p-7 sm:p-8 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 text-vermilion mb-5">{item.icon}</div>
                  <h3 className="font-display uppercase text-lg sm:text-xl text-paper leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-paper/60 leading-relaxed mb-6 line-clamp-3">
                    {item.summary}
                  </p>
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => setModalItem(item)}
                      className="inline-flex items-center gap-1.5 font-display uppercase text-sm tracking-wide text-vermilion hover:gap-3 transition-all duration-300 cursor-pointer"
                    >
                      See more
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
                        <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Automation Capabilities ────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
            >
              Built to last
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-display uppercase text-[9vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-4"
            >
              Automation <span className="text-vermilion">Capabilities</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
            >
              Every system we build is engineered for reliability. These are the standards we hold
              every automation to.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-paper/[0.03] rounded-2xl border border-paper/10 p-6 sm:p-7"
                >
                  <div className="w-8 h-8 text-vermilion mb-4">{cap.icon}</div>
                  <h3 className="font-display uppercase text-base sm:text-lg text-paper tracking-tight mb-2">
                    {cap.title}
                  </h3>
                  <p className="font-sans text-sm text-paper/50 leading-relaxed">
                    {cap.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Next service link ─────────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16">
          <div className="mx-auto max-w-[1400px] pt-10 border-t border-paper/10">
            <Link
              to="/services/ai-chatbots"
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/40">
                  Next service
                </span>
                <p className="font-display uppercase text-2xl sm:text-3xl text-paper group-hover:text-vermilion transition-colors mt-1">
                  AI Chatbots & Web Integration
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-display uppercase text-sm tracking-wide text-vermilion group-hover:gap-4 transition-all duration-300 shrink-0">
                View
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* ── Orange CTA ────────────────────────────────────────────────── */}
        <DarkOutro>
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
                Free automation audit
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display uppercase text-[15vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-tight text-white mb-8 sm:mb-10"
              >
                Stop Doing
                <br />
                It Manually<span className="text-paper">.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-xl mx-auto mb-12 flex flex-col gap-1"
              >
                <p className="text-white text-lg sm:text-xl font-semibold">
                  Book a free automation audit.
                </p>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  We'll map your repetitive tasks and show you exactly what can run on autopilot
                  — before you commit to anything.
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
                  Book a Free Audit
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>

                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
                  &#9679;&ensp;Available globally&ensp;&#9679;
                </span>
              </motion.div>
            </div>
          </section>
          <Footer />
        </DarkOutro>
      </main>

      <AnimatePresence>
        {modalItem && (
          <AutomationModal item={modalItem} onClose={() => setModalItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function AutomationsDetailPage() {
  return (
    <>
      <AutomationsContent />
      <ClickBurst />
    </>
  );
}
