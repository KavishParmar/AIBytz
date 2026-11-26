import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavigationTransition } from "../context/NavigationTransition";

const LINKS = [
  { label: "Services", href: "/services", page: true },
  { label: "AI Employees", href: "/ai-employees", page: true },
  { label: "About", href: "/about", page: true },
  { label: "Contact", href: "/contact", page: true },
];

const SCROLL_THRESHOLD = 50;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useNavigationTransition();
  const onHome = location.pathname === "/";
  const withHome = (hash) => (onHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "mt-3 max-w-3xl rounded-full border border-paper/[0.08] bg-ink/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-5 py-2.5 sm:px-6"
            : "mt-0 max-w-[1400px] rounded-none border-transparent bg-transparent px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-4 sm:py-5"
        }`}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            startTransition("/", "Home");
          }}
          className={`font-display tracking-tight transition-all duration-500 ${
            scrolled ? "text-lg text-paper" : "text-xl sm:text-2xl text-paper"
          }`}
        >
          AIBytz
        </a>

        <div className="hidden md:flex items-center gap-8">
          <nav
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-extrabold text-paper transition-colors duration-500"
          >
            {LINKS.map((link) =>
              link.page ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(link.href, link.label);
                  }}
                  className="hover:text-vermilion transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={withHome(link.href)}
                  className="hover:text-vermilion transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <button
            onClick={() => startTransition("/contact", "Contact")}
            className={`inline-flex items-center gap-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-500 ${
              scrolled
                ? "bg-vermilion text-ink px-4 py-2 hover:bg-vermilion/80"
                : "bg-paper text-ink px-5 py-2.5 hover:bg-sunflower"
            }`}
          >
            Book free audit
          </button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-paper transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-paper transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-paper transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`pointer-events-auto md:hidden overflow-hidden mx-auto transition-all duration-500 ${
            scrolled
              ? "mt-1 max-w-3xl rounded-2xl border border-paper/[0.08] bg-ink/70 backdrop-blur-xl"
              : "bg-ink/95 backdrop-blur-md border-t border-black/10"
          }`}
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((link) =>
              link.page ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    startTransition(link.href, link.label);
                  }}
                  className={`py-3 font-mono text-sm uppercase tracking-widest cursor-pointer ${
                    scrolled
                      ? "text-paper hover:text-vermilion"
                      : "text-mist hover:text-paper"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={withHome(link.href)}
                  onClick={() => setOpen(false)}
                  className={`py-3 font-mono text-sm uppercase tracking-widest ${
                    scrolled
                      ? "text-paper hover:text-vermilion"
                      : "text-mist hover:text-paper"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
            <button
              onClick={() => {
                setOpen(false);
                startTransition("/contact", "Contact");
              }}
              className={`mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-mono uppercase tracking-widest ${
                scrolled
                  ? "bg-vermilion text-ink"
                  : "bg-paper text-ink"
              }`}
            >
              Book free audit
            </button>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
