import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";

/**
 * Shared layout for every legal page (Privacy Policy, Terms, Cookies,
 * Disclaimer). Renders the eyebrow badge, the big black title, the
 * "last updated" line, and a stack of numbered white chapter boxes.
 *
 * The page sits on the site background (--color-ink, a warm cream) so it
 * matches the rest of AIBytz. Each chapter is its own bordered white card.
 */

// A sealed / security shield icon for the eyebrow badge.
function ShieldIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5l7 3v5c0 4.3-2.9 8.3-7 10.5-4.1-2.2-7-6.2-7-10.5v-5l7-3z" />
      <path d="M9 11.5l2 2 4-4.5" />
    </svg>
  );
}

/**
 * Renders one chapter body. Each body may contain plain paragraphs,
 * bullet lists, and sub-headings, so we support a small block format:
 *   - string              -> a paragraph
 *   - { h: "..." }        -> a bold sub-heading
 *   - { list: [...] }     -> a bulleted list
 */
function ChapterBody({ body }) {
  return (
    <div className="space-y-4">
      {body.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className="text-mist text-sm sm:text-[15px] leading-relaxed">
              {block}
            </p>
          );
        }
        if (block.h) {
          return (
            <h3
              key={i}
              className="font-sans font-semibold text-paper text-sm sm:text-[15px] pt-1"
            >
              {block.h}
            </h3>
          );
        }
        if (block.list) {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.list.map((item, j) => (
                <li
                  key={j}
                  className="text-mist text-sm sm:text-[15px] leading-relaxed flex gap-3"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-vermilion" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

function LegalPageContent({
  seoTitle,
  seoDescription,
  path,
  eyebrow,
  title,
  lastUpdated,
  intro,
  chapters,
  closing,
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <Nav />

      <main className="bg-ink">
        {/* ── Header ───────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12">
          <div className="mx-auto max-w-[920px]">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mist hover:text-vermilion transition-colors mb-8"
            >
              <span aria-hidden>&larr;</span>
              Back home
            </Link>

            {/* Eyebrow: shield icon + LEGAL · PRIVACY (dull, capital, small) */}
            <div className="flex items-center gap-2 text-mist mb-5">
              <ShieldIcon className="w-4 h-4" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em]">
                {eyebrow}
              </span>
            </div>

            {/* Big black title */}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display uppercase text-paper text-[13vw] sm:text-[8vw] lg:text-[5.5rem] leading-[0.92] tracking-tight"
            >
              {title}
            </motion.h1>

            {/* Last updated line */}
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-mist mt-6">
              Last updated &mdash; {lastUpdated}
            </p>

            {intro && (
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="max-w-2xl text-mist text-sm sm:text-base leading-relaxed mt-6 sm:mt-8"
              >
                {intro}
              </motion.p>
            )}
          </div>
        </section>

        {/* ── Chapters ─────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-16 sm:pb-24">
          <div className="mx-auto max-w-[920px] space-y-5 sm:space-y-6">
            {chapters.map((chapter, i) => (
              <motion.article
                key={chapter.heading}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.05 }}
                className="rounded-2xl sm:rounded-[1.5rem] bg-white border border-paper/10 shadow-[0_4px_24px_rgba(20,18,26,0.06)] p-6 sm:p-8 lg:p-10"
              >
                <h2 className="font-sans text-lg sm:text-xl lg:text-2xl text-paper font-semibold mb-4 sm:mb-5">
                  <span className="text-vermilion">{i + 1}.</span>{" "}
                  {chapter.heading}
                </h2>
                <ChapterBody body={chapter.body} />
              </motion.article>
            ))}

            {closing && (
              <p className="text-mist text-xs sm:text-sm leading-relaxed text-center pt-4 px-2">
                {closing}
              </p>
            )}
          </div>
        </section>

        <DarkOutro>
          <Footer />
        </DarkOutro>
      </main>

    </>
  );
}

export default function LegalPage(props) {
  return <LegalPageContent {...props} />;
}
