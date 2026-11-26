import { Link } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found | AIBytz" description="This page doesn't exist." path="/404" />
      <Nav />
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display uppercase text-[20vw] sm:text-[12rem] leading-none text-vermilion">
          404
        </h1>
        <p className="font-mono text-sm uppercase tracking-widest text-mist mt-4 mb-8">
          This page doesn't exist
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-sunflower transition-colors"
        >
          Back to home
          <span aria-hidden>&rarr;</span>
        </Link>
      </main>
    </>
  );
}
