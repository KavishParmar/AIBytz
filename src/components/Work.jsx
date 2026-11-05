import { motion } from "framer-motion";
import content from "../content/site.json";

export default function Work() {
  const PROJECTS = content.projects;
  return (
    <section id="work" className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10 sm:py-16 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <h2 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-none">
            Selected
            <br />
            work
          </h2>
          <p className="hidden sm:block font-mono text-xs uppercase tracking-widest text-mist max-w-[14rem] text-right">
            Four recent builds &mdash; more in the full archive
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.id || project.name}
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden ${project.span} aspect-[4/3] sm:aspect-[16/10] ${project.image ? "" : project.color} p-6 sm:p-8 flex flex-col justify-between text-ink`}
            >
              {project.image && (
                <>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                </>
              )}

              <div
                className={`relative flex items-start justify-between font-mono text-xs uppercase tracking-widest ${project.image ? "text-paper" : ""}`}
              >
                <span>{project.tag}</span>
                <span>{project.year}</span>
              </div>

              <div className="relative flex items-end justify-between gap-4">
                <h3
                  className={`font-display uppercase text-2xl sm:text-3xl lg:text-4xl leading-[0.95] ${project.image ? "text-paper" : ""}`}
                >
                  {project.name}
                </h3>
                <span className="shrink-0 grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-ink text-paper transition-transform group-hover:rotate-45">
                  &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
