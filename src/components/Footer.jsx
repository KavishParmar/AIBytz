import { Link } from "react-router-dom";
import content from "../content/site.json";

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
  { label: "Disclaimer", to: "/disclaimer" },
];

const NAV_LINKS = [
  { label: "Services", to: "/services", page: true },
  { label: "AI Employees", to: "/ai-employees", page: true },
  { label: "Process", href: "#process" },
  { label: "Advantages", href: "#advantages" },
  { label: "About", to: "/about", page: true },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SOCIALS = [
  { icon: <InstagramIcon />, href: content.footer.instagram, label: "Instagram" },
  { icon: <LinkedInIcon />, href: content.footer.linkedin, label: "LinkedIn" },
  { icon: <EmailIcon />, href: `mailto:${content.cta.email}`, label: "Email" },
  { icon: <GitHubIcon />, href: "https://github.com/aibytz", label: "GitHub" },
];

export default function Footer() {

  return (
    <footer className="relative pt-14 sm:pt-20 pb-6 border-t border-white/10 text-ink">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
          {/* Left — Brand + tagline + social icons */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="https://aibytz.com/" className="font-display text-2xl sm:text-3xl tracking-tight inline-block">
              AIBytz
            </a>
            <p className="text-ink/60 text-sm mt-3 max-w-xs leading-relaxed">
              AI employees and automation for businesses.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/50 hover:text-vermilion hover:border-vermilion hover:-translate-y-1 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Middle — Navigation */}
          <nav className="md:col-span-3 lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/40 mb-1">
              Navigate
            </span>
            {NAV_LINKS.map((link) =>
              link.page ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-vermilion hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-vermilion hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right — CTA */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/40 mb-1">
              Get Started
            </span>
            <p className="text-ink/60 text-sm leading-relaxed max-w-xs">
              Ready to automate your business? Let's talk about what's possible.
            </p>
            <Link
              to="/contact"
              className="mt-1 w-fit font-mono text-xs uppercase tracking-widest border border-ink/20 rounded-full px-6 py-3 text-ink/70 hover:bg-vermilion hover:text-ink hover:border-vermilion hover:-translate-y-1 transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright + legal links in one row */}
      <div className="border-t border-white/10 pt-4 pb-4">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/35">
            &copy; {new Date().getFullYear()} AIBytz &mdash; {content.footer.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-mono text-[11px] uppercase tracking-widest text-ink/40 hover:text-vermilion transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
