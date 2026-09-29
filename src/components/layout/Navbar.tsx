import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import kizunaLogoDark from "../../assets/brand/kizuna-logo.png";
import kizunaLogoLight from "../../assets/brand/kizuna-logo-light.jpeg";
import ThemeToggle from "../common/ThemeToggle";

const navLinkClass =
  "relative py-2 text-sm text-muted transition-colors duration-200 " +
  "hover:text-primary " +
  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 " +
  "after:bg-primary after:transition-all after:duration-300 " +
  "hover:after:w-full";

const mobileNavLinkClass =
  "rounded-xl px-4 py-3 text-sm font-medium text-muted " +
  "transition-colors hover:bg-card hover:text-primary";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center"
          aria-label="KIZUNA Home"
        >
          <img
            src={kizunaLogoDark}
            alt="KIZUNA"
            className="kizuna-logo kizuna-logo--dark h-14 w-auto object-contain sm:h-16"
          />

          <img
            src={kizunaLogoLight}
            alt="KIZUNA"
            className="kizuna-logo kizuna-logo--light h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={navLinkClass}
          >
            Discover
          </Link>

          <Link
            to="/#trending"
            className={navLinkClass}
          >
            Top Manga
          </Link>

          <Link
            to="/#genres"
            className={navLinkClass}
          >
            Genres
          </Link>

          <Link
            to="/ai"
            className={navLinkClass}
          >
            AI Finder
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {isMenuOpen ? (
              <X
                className="size-5"
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="size-5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            <Link
              to="/"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Discover
            </Link>

            <Link
              to="/#trending"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Top Manga
            </Link>

            <Link
              to="/#genres"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Genres
            </Link>
            <Link
              to="/ai"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              AI Finder
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}