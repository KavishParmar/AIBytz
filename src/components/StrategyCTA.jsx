import { motion } from "framer-motion";
import TransitionLink from "./TransitionLink";

export default function StrategyCTA() {

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-vermilion px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-24 sm:py-32 lg:py-40"
    >
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.07]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-black/[0.06]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-white/70 mb-6"
        >
          Free 30-minute session
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-[15vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-tight text-white mb-8 sm:mb-10"
        >
          Ready To
          <br />
          Grow<span className="text-paper">?</span>
        </motion.h2>

        {/* Subtext */}
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

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <TransitionLink
            to="/contact"
            label="Contact"
            className="group relative inline-flex items-center gap-3 rounded-full bg-white text-vermilion px-10 py-5 sm:px-14 sm:py-6 font-mono text-sm sm:text-base uppercase tracking-widest font-bold hover:bg-paper hover:text-ink transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          >
            Book a Strategy Call
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </TransitionLink>

          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            &#9679;&ensp;Available globally&ensp;&#9679;
          </span>
        </motion.div>
      </div>
    </section>
  );
}
