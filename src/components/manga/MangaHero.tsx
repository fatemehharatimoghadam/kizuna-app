import {
  BookOpen,
  Layers3,
  Star,
} from "lucide-react";

import type { Manga } from "../../types/manga";

interface MangaHeroProps {
  manga: Manga;
}

export default function MangaHero({
  manga,
}: MangaHeroProps) {
  const imageUrl =
    manga.images.webp?.large_image_url ??
    manga.images.jpg.large_image_url ??
    manga.images.jpg.image_url;

  const hasEnglishTitle =
    manga.title_english &&
    manga.title_english !== manga.title;

  return (
    <section className="relative min-w-0 overflow-hidden rounded-3xl border border-border bg-card/40 px-5 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      {/* Orange cinematic glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(240,90,40,0.16),transparent_38%),radial-gradient(circle_at_85%_80%,rgba(230,181,102,0.07),transparent_35%)]"
        aria-hidden="true"
      />

      {/* Subtle highlight line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="grid min-w-0 gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:items-center lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
          {/* Manga cover */}
          <div className="mx-auto w-full max-w-[220px] sm:max-w-[250px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <img
                src={imageUrl}
                alt={`${manga.title} cover`}
                className="h-full w-full object-cover"
              />

              {/* Score */}
              {manga.score != null && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/75 px-2.5 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                  <Star
                    className="size-4 text-gold"
                    aria-hidden="true"
                  />

                  {manga.score.toFixed(1)}
                </div>
              )}
            </div>
          </div>

          {/* Manga information */}
          <div className="min-w-0">
            {/* Type */}
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              {manga.type ?? "Manga"}
            </p>

            {/* Main title */}
            <h1 className="mt-3 break-words text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {manga.title}
            </h1>

            {/* English title */}
            {hasEnglishTitle && (
              <p className="mt-3 break-words text-base leading-7 text-muted sm:text-lg">
                {manga.title_english}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {/* Status */}
              {manga.status && (
                <span className="inline-flex max-w-full items-center rounded-lg border border-border bg-card/80 px-3 py-2 text-sm text-muted backdrop-blur-sm">
                  <span className="truncate">
                    {manga.status}
                  </span>
                </span>
              )}

              {/* Chapters */}
              {manga.chapters != null && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 text-sm text-muted backdrop-blur-sm">
                  <BookOpen
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />

                  {manga.chapters} Chapters
                </span>
              )}
              {/* Volumes */}
              {manga.volumes != null && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 text-sm text-muted backdrop-blur-sm">
                  <Layers3
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />

                  {manga.volumes} Volumes
                </span>
              )}
            </div>

            {/* Genres */}
            {manga.genres &&
              manga.genres.length > 0 && (
                <div className="mt-6 border-t border-border/80 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    Genres
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {manga.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="rounded-full border border-border bg-surface/70 px-3 py-1.5 text-sm text-muted backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}