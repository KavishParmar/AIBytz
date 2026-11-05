import { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";
import ClickBurst from "./ClickBurst";

const AutomationsDetailPage = lazy(() => import("./AutomationsDetailPage"));
const ChatbotsDetailPage = lazy(() => import("./ChatbotsDetailPage"));

// ─── deep detail data, keyed by slug ────────────────────────────────────────────

const DETAILS = {
  "ai-automations": {
    n: "01",
    title: "AI-Powered Custom Automations",
    tagline: "Your ops on autopilot.",
    intro:
      "Every business runs on a hundred small tasks that nobody enjoys and everybody has to do. We find the ones eating your week and hand them to a system that never forgets, never gets tired, and never asks for a day off.",
    overview:
      "We don't sell templates. We map how your business actually runs, then build automation flows wired directly into the tools you already use — CRM, email, spreadsheets, WhatsApp, whatever it is. Once it's live, the busywork just... stops being your problem.",
    what: [
      "CRM & Pipeline Syncing — leads, deals, and contacts updated the moment anything changes.",
      "Operations & Backend Workflows — the invisible glue between your apps, running silently.",
      "Data Entry & Report Generation — numbers pulled, cleaned, and delivered on schedule.",
      "Email & Follow-Up Sequences — the right message to the right person at the right time.",
    ],
    outcomes: [
      "10+ hours a week back for your team",
      "Zero missed follow-ups",
      "Reports that build themselves",
      "Fewer human errors, by design",
    ],
  },
  "ai-employees": {
    n: "02",
    title: "Pre-Trained AI Employees",
    tagline: "A new hire that never sleeps.",
    intro:
      "Imagine onboarding a team member who already knows your business, works around the clock, never calls in sick, and costs a fraction of a salary. That's what an AI employee is — ready to work from day one.",
    overview:
      "We train AI agents on your business data, your tone, and your workflows, then deploy them into the roles that keep your pipeline moving. They hold real conversations, qualify leads, book appointments, and escalate to a human only when it actually matters.",
    what: [
      "AI Sales Assistant — qualifies, nurtures, and warms leads before they hit your inbox.",
      "AI Customer Support Agent — answers the repeat questions instantly, 24/7.",
      "AI Appointment Scheduler — books, reschedules, and reminds without you lifting a finger.",
      "AI Lead Qualifier — scores and routes every inbound so your team only talks to the ready ones.",
    ],
    outcomes: [
      "Leads answered in seconds, not hours",
      "Coverage 24/7/365",
      "Consistent, on-brand replies every time",
      "Your team freed for high-value work",
    ],
  },
  "ai-chatbots": {
    n: "03",
    title: "AI Chatbots & Web Integration",
    tagline: "Always on, always helpful.",
    intro:
      "Most visitors leave with their question unanswered. A smart chatbot catches them in the moment — answering, guiding, and capturing the lead before they bounce. Trained on your products, it feels like your best rep is always on shift.",
    overview:
      "We embed intelligent chatbots directly into your website, WhatsApp, and social channels. They're trained specifically on your offering, so answers are accurate, on-brand, and genuinely useful — not the frustrating canned loops people are used to.",
    what: [
      "Website Live Chat Widgets — instant answers that turn browsers into buyers.",
      "WhatsApp & Instagram Bots — meet customers where they already spend their time.",
      "Knowledge-Base Assistants — your docs and FAQs, searchable in plain language.",
      "Multi-Channel Integration — one brain, every channel, consistent everywhere.",
    ],
    outcomes: [
      "More leads captured, around the clock",
      "Instant answers, zero wait time",
      "Lower support load on your team",
      "Higher conversion from existing traffic",
    ],
  },
};

const ORDER = ["ai-automations", "ai-employees", "ai-chatbots"];

// ─── inline CTA button section ──────────────────────────────────────────────────

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
          Let's Build
          <br />
          Yours<span className="text-paper">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-12 flex flex-col gap-1"
        >
          <p className="text-white text-lg sm:text-xl font-semibold">
            Book a free 30-minute strategy session.
          </p>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            No fluff, no sales pitch — just a clear diagnosis of where you are and what's possible.
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

// ─── content ─────────────────────────────────────────────────────────────────

function ServiceDetailContent({ slug }) {
  const data = DETAILS[slug];
  const idx = ORDER.indexOf(slug);
  const next = ORDER[(idx + 1) % ORDER.length];
  const nextData = DETAILS[next];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <SEO
        title={`${data.title} | AIBytz Services`}
        description={data.intro}
        path={`/services/${slug}`}
      />
      <Nav />
      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
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
              Service {data.n} / 03 — {data.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display uppercase text-[11vw] sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-paper mb-6 max-w-5xl"
            >
              {data.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-2xl text-paper/60 text-base sm:text-lg leading-relaxed"
            >
              {data.intro}
            </motion.p>
          </div>
        </section>

        {/* ── Overview + What's included ───────────────────────────────── */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* overview */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
                The overview
              </p>
              <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-paper mb-6">
                How it works
              </h2>
              <p className="text-paper/70 text-base sm:text-lg leading-relaxed">
                {data.overview}
              </p>
            </motion.div>

            {/* what's included */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-5">
                What's included
              </p>
              <ul className="flex flex-col gap-4">
                {data.what.map((item) => {
                  const [head, ...rest] = item.split(" — ");
                  return (
                    <li
                      key={head}
                      className="flex items-start gap-3 bg-white rounded-xl border border-[#e0ddd6] p-4 sm:p-5"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-vermilion shrink-0" />
                      <span className="font-sans text-sm sm:text-[0.95rem] text-paper leading-relaxed">
                        <span className="font-semibold">{head}</span>
                        {rest.length ? <span className="text-paper/60"> — {rest.join(" — ")}</span> : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-vermilion mb-4">
              What you get
            </p>
            <h2 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-paper mb-14">
              The outcomes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.outcomes.map((o, i) => (
                <motion.div
                  key={o}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-4 bg-paper/[0.03] rounded-2xl border border-paper/10 p-6"
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

            {/* next service */}
            <div className="mt-20 pt-10 border-t border-paper/10">
              <Link
                to={`/services/${next}`}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/40">
                    Next service
                  </span>
                  <p className="font-display uppercase text-2xl sm:text-3xl text-paper group-hover:text-vermilion transition-colors mt-1">
                    {nextData.title}
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
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <DarkOutro>
          <DetailCTA />
          <Footer />
        </DarkOutro>
      </main>
    </>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();

  if (slug === "ai-automations") {
    return (
      <Suspense fallback={null}>
        <AutomationsDetailPage />
      </Suspense>
    );
  }

  if (slug === "ai-chatbots") {
    return (
      <Suspense fallback={null}>
        <ChatbotsDetailPage />
      </Suspense>
    );
  }

  if (!DETAILS[slug]) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <ServiceDetailContent slug={slug} />
      <ClickBurst />
    </>
  );
}
