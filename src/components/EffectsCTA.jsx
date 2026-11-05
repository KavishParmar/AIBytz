import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EffectsCTA() {

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase leading-[0.95] mb-6"
        >
          <span className="block text-[15vw] sm:text-[9vw] lg:text-[7rem] text-vermilion">
            Want this?
          </span>
          <span className="block text-2xl sm:text-4xl lg:text-5xl tracking-tight mt-3">
            Get effects like these built into your own website or product
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-paper text-ink px-8 py-4 sm:px-10 sm:py-5 font-mono text-sm uppercase tracking-widest hover:bg-sunflower transition-colors"
          >
            Contact us
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 font-mono text-xs sm:text-sm uppercase tracking-widest text-mist"
        >
          It costs nothing to ask — inquiries are free
        </motion.p>
      </div>
    </section>
  );
}
