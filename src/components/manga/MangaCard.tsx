import {
  BookOpen,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Manga } from "../../types/manga";

interface MangaCardProps {
  manga: Manga;
}

export default function MangaCard({
  manga,
}: MangaCardProps) {
  const imageUrl =
    manga.images.webp?.large_image_url ??
    manga.images.jpg.large_image_url ??
    manga.images.jpg.image_url;

  return (
    <article className="group min-w-0">
      <Link
        to={`/manga/${manga.mal_id}`}
        className="block min-w-0"
        aria-label={`View details for ${manga.title}`}
      >
        {/* Cover */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-xl">
          <img
            src={imageUrl}
            alt={manga.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {/* Cinematic bottom gradient */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
            aria-hidden="true"
          />

          {/* Manga type */}
          {manga.type && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <BookOpen
                  className="size-3.5"
                  aria-hidden="true"
                />

                {manga.type}
              </span>
            </div>
          )}

          {/* Score */}
          {manga.score != null && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/65 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Star
                  className="size-3.5 text-gold"
                  aria-hidden="true"
                />

                {manga.score.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="min-w-0 px-1 pt-3.5">
          <h2
            className="line-clamp-1 font-semibold leading-6 text-foreground transition-colors duration-200 group-hover:text-primary"
            title={manga.title}
          >
            {manga.title}
          </h2>

          <div className="mt-1.5 flex min-w-0 items-center gap-2 text-xs text-muted">
            {manga.status && (
              <span className="min-w-0 truncate">
                {manga.status}
              </span>
            )}

            {manga.status && manga.chapters != null && (
              <span
                className="shrink-0 text-border"
                aria-hidden="true"
              >
                •
              </span>
            )}

            {manga.chapters != null && (
              <span className="shrink-0">
                {manga.chapters} ch.
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}