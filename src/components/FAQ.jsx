import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "WHAT EXACTLY DOES VAANTAAI BUILD?",
    a: "We build AI employees and automation systems for businesses. This includes AI chatbots, WhatsApp bots, lead capture automations, CRM workflows, appointment booking systems, and custom AI agents that handle repetitive tasks so your team can focus on what matters.",
  },
  {
    q: "HOW LONG DOES IT TAKE TO GET MY PROJECT LIVE?",
    a: "Most projects go live within 7 to 14 days. We keep our team lean on purpose — no committees, no approval chains. You get a working prototype within the first few days and a fully deployed system shortly after.",
  },
  {
    q: "DO I NEED ANY TECHNICAL KNOWLEDGE TO USE WHAT YOU BUILD?",
    a: "Not at all. Everything we deliver is designed to be used by anyone on your team. We set up dashboards, provide simple documentation, and walk you through the system so you can manage it confidently from day one.",
  },
  {
    q: "WHAT HAPPENS IF SOMETHING BREAKS AFTER LAUNCH?",
    a: "We include a support period after every project goes live. If anything breaks or needs adjustment, we fix it. Beyond that, we offer ongoing maintenance plans so your systems stay healthy as your business grows.",
  },
  {
    q: "DO I OWN THE CODE AND SYSTEMS YOU BUILD FOR ME?",
    a: "Yes, 100 percent. Every line of code, every workflow, every automation — it all belongs to you from day one. There is no vendor lock-in, no recurring license fees, and no strings attached.",
  },
  {
    q: "HOW MUCH DOES IT COST TO WORK WITH VAANTAAI?",
    a: "It depends on the scope of the project. We offer everything from focused single automations to full AI system buildouts. Book a free strategy call and we will give you a clear estimate based on what you actually need — no hidden fees, no upsells.",
  },
  {
    q: "CAN YOU INTEGRATE WITH THE TOOLS WE ALREADY USE?",
    a: "Absolutely. We work with all major platforms — Google Workspace, Slack, HubSpot, Notion, Shopify, WhatsApp Business, Calendly, Stripe, and hundreds more through n8n and Make. If your tool has an API, we can connect it.",
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14"
        >
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-vermilion font-bold mb-2">
            Got Questions?
          </p>
          <h2 className="font-display uppercase text-[clamp(2.8rem,6vw,5.5rem)] leading-none text-paper">
            Frequently Asked
            <br className="hidden sm:block" /> Questions
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="border-b border-paper/10"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer group"
                >
                  <span className="font-sans text-sm sm:text-base font-bold text-paper tracking-wide leading-snug flex items-baseline gap-3">
                    <span className="font-mono text-xs text-vermilion shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-vermilion text-ink"
                        : "bg-paper/[0.06] text-paper/50 group-hover:bg-paper/10"
                    }`}
                  >
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 sm:pb-6 pr-12 font-sans text-sm text-mist leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
