import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shuffle } from "lucide-react";

import { fetchRandomManga } from "../../services/manga.service";

import type { Manga } from "../../types/manga";

export default function RandomDiscoverySection() {
  const [manga, setManga] = useState<Manga | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDiscover = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const result = await fetchRandomManga();

      setManga(result);
    } catch (error) {
      console.error("Failed to load random manga:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = manga
    ? manga.images.webp?.large_image_url ??
      manga.images.jpg.large_image_url ??
      manga.images.jpg.image_url
    : null;

  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="grid min-h-[420px] lg:grid-cols-[1fr_420px]">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-card">
                <Shuffle
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Random Discovery
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Feeling adventurous?
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted">
                Leave the choice to KIZUNA and discover a manga
                you might never have searched for.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleDiscover}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Shuffle
                    className="size-4"
                    aria-hidden="true"
                  />

                  {isLoading
                    ? "Discovering..."
                    : manga
                      ? "Try Another"
                      : "Surprise Me"}
                </button>
              </div>

              {hasError && (
                <p className="mt-4 text-sm text-primary">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <div className="relative min-h-[360px] border-t border-border bg-card lg:min-h-0 lg:border-l lg:border-t-0">
              {manga && imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt={manga.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  <div className="relative flex h-full flex-col justify-end p-8">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                      Your Discovery
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-foreground">
                      {manga.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
                      {manga.type && <span>{manga.type}</span>}
                      {manga.score != null && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{manga.score.toFixed(1)}</span>
                        </>
                      )}

                      {manga.status && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{manga.status}</span>
                        </>
                      )}
                    </div>

                    <Link
                      to={`/manga/${manga.mal_id}`}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      View Manga

                      <ArrowRight
                        className="size-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="max-w-xs text-center">
                    <Shuffle
                      className="mx-auto size-8 text-muted"
                      aria-hidden="true"
                    />

                    <p className="mt-4 text-sm leading-6 text-muted">
                      Your random discovery will appear here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}