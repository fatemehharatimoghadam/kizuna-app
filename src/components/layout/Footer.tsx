import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import kizunaLogoDark from "../../assets/brand/kizuna-logo.png";
import kizunaLogoLight from "../../assets/brand/kizuna-logo-light.jpeg";

const footerLinkClass =
  "group inline-flex items-center gap-1.5 text-sm text-muted " +
  "transition-colors duration-200 hover:text-primary";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Main footer */}
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="KIZUNA Home"
            >
              <img
                src={kizunaLogoDark}
                alt="KIZUNA"
                className="kizuna-logo kizuna-logo--dark h-14 w-auto object-contain"
              />

              <img
                src={kizunaLogoLight}
                alt="KIZUNA"
                className="kizuna-logo kizuna-logo--light h-14 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
              Discover manga, explore new worlds, and find
              stories that connect with you.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ai/20 bg-ai/5 px-3 py-1.5">
              <Sparkles
                className="size-3.5 text-ai"
                aria-hidden="true"
              />

              <span className="text-xs font-medium text-ai">
                Powered by KIZUNA Discovery
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Explore
            </p>

            <nav
              aria-label="Explore navigation"
              className="mt-5 flex flex-col items-start gap-3"
            >
              <Link
                to="/"
                className={footerLinkClass}
              >
                Discover
              </Link>

              <Link
                to="/#trending"
                className={footerLinkClass}
              >
                Top Manga
              </Link>

              <Link
                to="/#genres"
                className={footerLinkClass}
              >
                Genres
              </Link>
            </nav>
          </div>

          {/* Discovery */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              KIZUNA
            </p>

            <nav
              aria-label="KIZUNA navigation"
              className="mt-5 flex flex-col items-start gap-3"
            >
              <Link
                to="/ai"
                className={footerLinkClass}
              >
                AI Finder

                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                to="/search"
                className={footerLinkClass}
              >
                Browse Manga
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © 2026 KIZUNA. Manga discovery, reimagined.
          </p>
          <p className="text-xs text-muted">
            絆 — stories that connect.
          </p>
        </div>
      </div>
    </footer>
  );
}