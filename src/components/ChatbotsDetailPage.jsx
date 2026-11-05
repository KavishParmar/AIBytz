import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";
import ClickBurst from "./ClickBurst";

// ─── chatbot use-case cards ─────────────────────────────────────────────────

const CHATBOTS = [
  {
    id: "real-estate",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M6 24L24 8l18 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22v18h10V30h8v10h10V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Real Estate Agency Chatbot",
    summary:
      "Qualifies buyers instantly, answers property questions, schedules viewings, and captures seller leads — all while your agents focus on closing deals.",
    details: [
      "Answers property availability, pricing, and location queries 24/7",
      "Qualifies buyers by budget, timeline, and property preferences",
      "Books viewing appointments directly into agent calendars",
      "Captures seller leads with intelligent follow-up sequences",
      "Integrates with MLS listings and CRM platforms",
    ],
  },
  {
    id: "medical",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="14" y="6" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="38" r="2" fill="currentColor" />
      </svg>
    ),
    title: "Medical Clinic Chatbot",
    summary:
      "Handles patient intake, appointment booking, FAQ responses, and pre-visit forms — reducing front-desk load and improving patient experience.",
    details: [
      "Appointment scheduling with doctor-specific availability",
      "Pre-visit form collection and symptom triage",
      "Insurance and billing FAQ responses",
      "Prescription refill requests and status updates",
      "Multi-language support for diverse patient populations",
    ],
  },
  {
    id: "ecommerce",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M6 6h6l6 28h16l6-20H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="40" r="3" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="34" cy="40" r="3" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
    title: "E-Commerce Chatbot",
    summary:
      "Guides shoppers to the right products, handles order tracking, processes returns, and recovers abandoned carts — turning browsers into repeat buyers.",
    details: [
      "Product recommendations based on browsing behaviour and preferences",
      "Real-time order tracking and delivery status updates",
      "Automated return and refund processing",
      "Abandoned cart recovery with personalised incentives",
      "Integration with Shopify, WooCommerce, and other platforms",
    ],
  },
  {
    id: "whatsapp",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 4C12.954 4 4 12.954 4 24c0 3.52.917 6.832 2.525 9.706L4 44l10.56-2.47A19.91 19.91 0 0024 44c11.046 0 20-8.954 20-20S35.046 4 24 4z" stroke="currentColor" strokeWidth="2.5" />
        <path d="M17 20c0 0 1-4 7-4s7 4 7 4v2c0 0-1 4-7 4s-7-4-7-4v-2z" stroke="currentColor" strokeWidth="2" />
        <path d="M17 26s1.5 4 7 4 7-4 7-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "WhatsApp Business Bot",
    summary:
      "Meet your customers where they already are. Automated conversations on WhatsApp that handle enquiries, bookings, and support at scale.",
    details: [
      "Automated responses to common customer questions",
      "Product catalogue browsing within WhatsApp conversations",
      "Appointment and order confirmations with rich media",
      "Broadcast campaigns with personalised messaging",
      "Seamless handoff to human agents when needed",
    ],
  },
  {
    id: "support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 6v5M24 37v5M6 24h5M37 24h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Knowledge Base Assistant",
    summary:
      "Your entire documentation, FAQs, and help centre made searchable in plain language. Customers find answers instantly without submitting a ticket.",
    details: [
      "Trained on your complete documentation and knowledge base",
      "Natural language search — no keywords needed",
      "Contextual follow-up questions for deeper answers",
      "Ticket creation when the bot reaches its knowledge boundary",
      "Analytics on common questions to improve your docs",
    ],
  },
];

// ─── advantages ─────────────────────────────────────────────────────────────

const ADVANTAGES = [
  {
    title: "Instant Response Time",
    stat: "< 2s",
    description:
      "Every visitor gets an answer in under two seconds. No wait queues, no business-hours limitations, no 'we'll get back to you' emails.",
  },
  {
    title: "Higher Lead Capture",
    stat: "3x",
    description:
      "Businesses using AI chatbots see up to 3x more leads captured from the same traffic — because every visitor gets engaged, not just the ones who fill out a form.",
  },
  {
    title: "Trained On Your Business",
    stat: "100%",
    description:
      "Every chatbot is trained specifically on your products, services, pricing, and tone. Answers are accurate and on-brand — not generic canned responses.",
  },
  {
    title: "Multi-Channel Presence",
    stat: "∞",
    description:
      "One chatbot brain, deployed everywhere — your website, WhatsApp, Instagram, Facebook Messenger. Consistent experience across every channel.",
  },
  {
    title: "Reduced Support Load",
    stat: "70%",
    description:
      "Automate up to 70% of repetitive support queries. Your team handles the complex cases while the bot takes care of the rest.",
  },
  {
    title: "24/7 Availability",
    stat: "Always",
    description:
      "Your chatbot never sleeps, never takes a break, and never misses a midnight enquiry. Every timezone, every hour — covered.",
  },
];

// ─── modal ──────────────────────────────────────────────────────────────────

function ChatbotModal({ item, onClose }) {
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
            Get this chatbot
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

function ChatbotsContent() {
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="AI Chatbots & Web Integration | AIBytz Services"
        description="Smart chatbots embedded into your website, WhatsApp, and social channels. Trained on your business, always on, always helpful — capture more leads and answer every question instantly."
        path="/services/ai-chatbots"
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
              Service 03 / 03 — Always on, always helpful.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display uppercase text-[11vw] sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-paper mb-6 max-w-5xl"
            >
              AI Chatbots & Web Integration
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-2xl text-paper/60 text-base sm:text-lg leading-relaxed mb-10"
            >
              Most visitors leave with their question unanswered. A smart chatbot catches them in the
              moment — answering, guiding, and capturing the lead before they bounce. Trained on your
              products, it feels like your best rep is always on shift.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { label: "3x", caption: "Lead capture increase" },
                { label: "< 2s", caption: "Average response time" },
                { label: "70%", caption: "Support queries handled" },
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

        {/* ── Chatbot Use Cases (cards with "See More") ────────────────── */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
            >
              Use cases
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-display uppercase text-[9vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-4"
            >
              Chatbots That <span className="text-vermilion">Work</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
            >
              We embed intelligent chatbots directly into your channels. They're trained specifically
              on your offering — not frustrating canned loops.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {CHATBOTS.map((item, i) => (
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

        {/* ── Advantages ─────────────────────────────────────────────────── */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4"
            >
              The edge
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-display uppercase text-[9vw] sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-paper mb-4"
            >
              Chatbot <span className="text-vermilion">Advantages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-paper/60 text-base sm:text-lg max-w-xl mb-14"
            >
              Why businesses that deploy AI chatbots outperform those that don't.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ADVANTAGES.map((adv, i) => (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-paper/[0.03] rounded-2xl border border-paper/10 p-6 sm:p-7"
                >
                  <span className="font-display text-3xl sm:text-4xl text-vermilion block leading-none mb-3">
                    {adv.stat}
                  </span>
                  <h3 className="font-display uppercase text-base sm:text-lg text-paper tracking-tight mb-2">
                    {adv.title}
                  </h3>
                  <p className="font-sans text-sm text-paper/50 leading-relaxed">
                    {adv.description}
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
              to="/services/ai-automations"
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/40">
                  Next service
                </span>
                <p className="font-display uppercase text-2xl sm:text-3xl text-paper group-hover:text-vermilion transition-colors mt-1">
                  AI-Powered Custom Automations
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
                Free chatbot demo
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display uppercase text-[15vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-tight text-white mb-8 sm:mb-10"
              >
                Stop Losing
                <br />
                Leads<span className="text-paper">.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-xl mx-auto mb-12 flex flex-col gap-1"
              >
                <p className="text-white text-lg sm:text-xl font-semibold">
                  See a chatbot trained on your business — for free.
                </p>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  We'll build a demo chatbot using your actual products and services.
                  No commitment — just a preview of what's possible.
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
                  Request a Free Demo
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
          <ChatbotModal item={modalItem} onClose={() => setModalItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function ChatbotsDetailPage() {
  return (
    <>
      <ChatbotsContent />
      <ClickBurst />
    </>
  );
}
