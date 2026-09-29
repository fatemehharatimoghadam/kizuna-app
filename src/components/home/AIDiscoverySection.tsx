import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AIDiscoverySection() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-ai/30 bg-surface px-8 py-14 sm:px-12 lg:px-16">
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-ai/10 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-40 left-1/3 size-72 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl">
            <div className="flex size-12 items-center justify-center rounded-xl border border-ai/30 bg-ai/10">
              <Sparkles
                className="size-5 text-ai"
                aria-hidden="true"
              />
            </div>

            <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-ai">
              KIZUNA AI
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Describe the story you want to read.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Tell KIZUNA what kind of world, mood, characters, or
              story you are looking for and discover manga that
              match your idea.
            </p>

            <Link
              to="/ai"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ai px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Try AI Finder

              <ArrowRight
                className="size-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}