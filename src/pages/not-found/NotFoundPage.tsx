import {
  ArrowLeft,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[75vh] items-center overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(240,90,40,0.12),transparent_38%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Error code */}
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Lost between pages
          </p>

          <h1 className="mt-5 text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
            404
          </h1>

          <h2 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
            This story couldn't be found.
          </h2>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-muted">
            The page you're looking for may have moved,
            disappeared, or never existed in KIZUNA.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ArrowLeft
                className="size-4"
                aria-hidden="true"
              />

              Back to Home
            </Link>

            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <Search
                className="size-4"
                aria-hidden="true"
              />

              Browse Manga
            </Link>
          </div>

          {/* Decorative mark */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-border" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              KIZUNA 絆
            </span>

            <span className="h-px w-12 bg-border" />
          </div>
        </div>
      </div>
    </main>
  );
}