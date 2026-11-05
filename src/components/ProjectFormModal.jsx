import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectForm } from "./ProjectFormContext";

const PROJECT_TYPES = [
  "AI Chatbot",
  "AI Employee / Agent",
  "WhatsApp Bot",
  "Workflow Automation",
  "Website",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const INITIAL = { name: "", email: "", phone: "", projectType: "", budget: "", details: "" };

export default function ProjectFormModal() {
  const { open, closeForm } = useProjectForm();
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => { setForm(INITIAL); setStatus("idle"); setError(""); }, 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  const inputCls =
    "w-full bg-paper border border-ink/10 rounded-xl px-4 py-3 text-ink text-sm placeholder:text-ink/30 focus:outline-none focus:border-vermilion transition-colors";
  const labelCls = "block font-mono text-[11px] uppercase tracking-widest text-ink/50 mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeForm}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-[5vh] sm:top-[8vh] bottom-[5vh] sm:bottom-auto z-50 w-full sm:w-[560px] max-h-[90vh] overflow-y-auto bg-ink rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-ink z-10 flex items-center justify-between px-6 py-5 border-b border-paper/10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-vermilion mb-0.5">
                  Start a project
                </p>
                <h2 className="font-display uppercase text-2xl text-paper leading-none">
                  Let's talk
                </h2>
              </div>
              <button
                onClick={closeForm}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-paper/10 text-paper/50 hover:text-paper hover:border-paper/30 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <span className="text-4xl">🎉</span>
                  <h3 className="font-display uppercase text-2xl text-paper">You're in!</h3>
                  <p className="text-paper/60 text-sm max-w-xs">
                    Got your message. We'll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={closeForm}
                    className="mt-4 font-mono text-xs uppercase tracking-widest border border-paper/20 rounded-full px-6 py-3 text-paper/70 hover:border-vermilion hover:text-vermilion transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={set("name")}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set("email")}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Project type</label>
                    <select
                      value={form.projectType}
                      onChange={set("projectType")}
                      className={inputCls}
                    >
                      <option value="">Select one…</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Budget</label>
                    <select
                      value={form.budget}
                      onChange={set("budget")}
                      className={inputCls}
                    >
                      <option value="">Select range…</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Tell us more</label>
                    <textarea
                      rows={4}
                      placeholder="What are you trying to build or automate?"
                      value={form.details}
                      onChange={set("details")}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-mono text-xs text-vermilion">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-vermilion text-ink py-4 font-mono text-sm uppercase tracking-widest hover:bg-sunflower transition-colors disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
