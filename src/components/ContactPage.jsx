import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";

const SUGGESTIONS = [
  "Need workflow automation",
  "Want a chatbot",
  "Need sales help",
  "WhatsApp integration",
  "Just saying hi",
];

/* ── Hero ──────────────────────────────────────────────────────────────────── */

function ContactHero() {
  return (
    <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-36 sm:pt-44 pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-5"
        >
          Gearing up for a chat
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-[14vw] sm:text-8xl lg:text-9xl leading-[0.88] tracking-tight text-paper mb-6"
        >
          Let's discuss
          <br />
          your <span className="text-vermilion">growth.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-2xl text-paper/60 text-base sm:text-lg leading-relaxed mb-10"
        >
          Free 30-minute session — no fluff, no sales pitch. Just a clear
          diagnosis of where you are and what AI can do for your business.
          Use the form below or book a call directly.
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-6 sm:gap-10"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 block mb-1">
              Response time
            </span>
            <span className="font-display text-2xl sm:text-3xl text-acid">{"<"} 24h</span>
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 block mb-1">
              Availability
            </span>
            <span className="font-display text-2xl sm:text-3xl text-paper">Global</span>
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 block mb-1">
              Cost
            </span>
            <span className="font-display text-2xl sm:text-3xl text-sunflower">Free</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Contact form ──────────────────────────────────────────────────────────── */

function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    details: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.subject.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("That email doesn't look right.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  if (status === "done") {
    return (
      <div className="text-center py-16">
        <span className="inline-block w-14 h-14 rounded-full bg-acid/20 text-acid text-2xl grid place-items-center mb-5">
          ✓
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid mb-4">
          Message sent
        </p>
        <h3 className="font-display uppercase text-3xl sm:text-4xl leading-none text-paper mb-3">
          Talk soon.
        </h3>
        <p className="text-paper/50 text-sm sm:text-base">
          We'll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50 block mb-2.5">
          <span className="text-vermilion mr-2">01.</span>Your Name *
        </label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Steve Harrington"
          className="w-full rounded-xl bg-white/[0.04] border border-paper/[0.08] px-5 py-4 text-paper placeholder:text-paper/25 focus:border-vermilion focus:bg-white/[0.06] outline-none transition-all"
        />
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50 block mb-2.5">
          <span className="text-vermilion mr-2">02.</span>Your Email *
        </label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="steve@company.com"
          className="w-full rounded-xl bg-white/[0.04] border border-paper/[0.08] px-5 py-4 text-paper placeholder:text-paper/25 focus:border-vermilion focus:bg-white/[0.06] outline-none transition-all"
        />
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50 block mb-2.5">
          <span className="text-vermilion mr-2">03.</span>Subject *
        </label>
        <input
          type="text"
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          placeholder="What you need help with"
          className="w-full rounded-xl bg-white/[0.04] border border-paper/[0.08] px-5 py-4 text-paper placeholder:text-paper/25 focus:border-vermilion focus:bg-white/[0.06] outline-none transition-all"
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("subject", s)}
              className="rounded-full border border-paper/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper/40 hover:border-vermilion hover:text-vermilion transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50 block mb-2.5">
          <span className="text-vermilion mr-2">04.</span>Project Details
        </label>

        <textarea
          value={values.details}
          onChange={(e) => set("details", e.target.value)}
          placeholder="Tell us more about your project..."
          rows={5}
          className="w-full rounded-xl bg-white/[0.04] border border-paper/[0.08] px-5 py-4 text-paper placeholder:text-paper/25 focus:border-vermilion focus:bg-white/[0.06] outline-none resize-none transition-all"
        />
      </div>

      {error && <p className="text-vermilion text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-vermilion text-white py-4 font-mono text-sm uppercase tracking-widest font-bold hover:bg-vermilion/85 transition-colors disabled:opacity-50 shadow-[0_4px_20px_rgba(255,59,31,0.25)]"
      >
        {status === "sending" ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}

/* ── Calendar embed ────────────────────────────────────────────────────────── */

function CalendarEmbed() {
  return (
    <div className="h-full min-h-[500px] flex flex-col">
      <div className="flex-1 rounded-2xl overflow-hidden bg-white/[0.04] border border-paper/[0.08]">
        <iframe
          src="https://calendly.com/kavishparmar/discovery-call"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Book a Strategy Call"
          className="min-h-[550px] lg:min-h-[630px]"
          style={{ minHeight: "550px" }}
        />
      </div>
    </div>
  );
}

/* ── Main two-column section ───────────────────────────────────────────────── */

function ContactMain() {
  return (
    <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Section labels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-vermilion">
              // Option 01 — The async way
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center gap-3"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-vermilion">
              // Option 02 — The direct way
            </span>
          </motion.div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl sm:rounded-3xl border border-paper/[0.06] bg-paper/[0.03] p-6 sm:p-8 lg:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-acid" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
                  Send a message
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/30">
                We reply {"<"} 24h
              </span>
            </div>
            <ContactForm />
          </motion.div>

          {/* Calendar Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {/* Mobile-only label */}
            <div className="lg:hidden flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-vermilion">
                // Option 02 — The direct way
              </span>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-paper/[0.06] bg-paper/[0.03] p-6 sm:p-8 lg:p-10 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-vermilion" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
                    Book a call
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/30">
                  Pick a slot
                </span>
              </div>
              <CalendarEmbed />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact | AIBytz — Book a Free Strategy Call"
        description="Book a free 30-minute AI strategy call with AIBytz. Send us a message or pick a time on our calendar."
        path="/contact"
      />
      <Nav />
      <main>
        <ContactHero />
        <ContactMain />
      </main>
      <DarkOutro>
        <Footer />
      </DarkOutro>
    </>
  );
}
