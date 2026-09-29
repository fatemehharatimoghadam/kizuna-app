import { Star } from "lucide-react";

import type { Manga } from "../../types/manga";

interface MangaHeroProps {
  manga: Manga;
}

export default function MangaHero({ manga }: MangaHeroProps) {
  const imageUrl =
    manga.images.webp?.large_image_url ??
    manga.images.jpg.large_image_url ??
    manga.images.jpg.image_url;

  return (
    <section className="grid gap-10 md:grid-cols-[280px_1fr] lg:gap-14">
      <div className="mx-auto w-full max-w-[280px] md:mx-0">
        <div className="aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src={imageUrl}
            alt={manga.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          {manga.type ?? "Manga"}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          {manga.title}
        </h1>

        {manga.title_english &&
          manga.title_english !== manga.title && (
            <p className="mt-3 text-lg text-muted">
              {manga.title_english}
            </p>
          )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {manga.score != null && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Star
                className="size-4 text-gold"
                aria-hidden="true"
              />

              <span className="font-semibold text-foreground">
                {manga.score.toFixed(1)}
              </span>
            </div>
          )}

          {manga.status && (
            <span className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted">
              {manga.status}
            </span>
          )}

          {manga.chapters != null && (
            <span className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted">
              {manga.chapters} Chapters
            </span>
          )}

          {manga.volumes != null && (
            <span className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted">
              {manga.volumes} Volumes
            </span>
          )}
        </div>

        {manga.genres && manga.genres.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {manga.genres.map((genre) => (
              <span
                key={genre.mal_id}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}