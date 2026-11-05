import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import content from "../content/site.json";

export default function CTA() {
  const { cta } = content;
  return (
    <section id="contact" className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-14 sm:py-20 lg:py-32">
      <div className="relative mx-auto max-w-[1400px] text-center text-ink">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display uppercase text-2xl sm:text-4xl lg:text-5xl tracking-tight text-vermilion mb-4"
        >
          {cta.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-[13vw] sm:text-[8vw] lg:text-8xl leading-[0.9] mb-6"
        >
          {cta.headlineLine1}
          <br />
          {cta.headlineLine2} <span className="text-acid">{cta.headlineAccent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto text-ink/70 text-base sm:text-lg mb-10"
        >
          {cta.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-ink text-paper px-8 py-4 sm:px-10 sm:py-5 font-mono text-sm uppercase tracking-widest hover:bg-sunflower hover:text-ink transition-colors"
          >
            {cta.primaryCtaLabel}
          </Link>
          <a
            href="#work"
            className="inline-flex items-center gap-3 rounded-full border border-ink/30 px-8 py-4 sm:px-10 sm:py-5 font-mono text-sm uppercase tracking-widest hover:border-vermilion hover:text-vermilion transition-colors"
          >
            {cta.secondaryCtaLabel}
            <span aria-hidden>&darr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
