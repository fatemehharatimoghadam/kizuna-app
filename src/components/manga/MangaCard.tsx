import { Link } from "react-router-dom";

import type { Manga } from "../../types/manga";

interface MangaCardProps {
  manga: Manga;
}

export default function MangaCard({ manga }: MangaCardProps) {
  const imageUrl =
    manga.images.webp?.large_image_url ??
    manga.images.jpg.large_image_url ??
    manga.images.jpg.image_url;

  return (
    <article className="group">
      <Link
        to={`/manga/${manga.mal_id}`}
        className="block"
        aria-label={`View details for ${manga.title}`}
      >
        <div className="aspect-[2/3] overflow-hidden rounded-xl bg-card">
          <img
            src={imageUrl}
            alt={manga.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-3">
          <h2 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            {manga.title}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted">
            {manga.type && <span>{manga.type}</span>}

            {manga.score != null && (
              <>
                <span aria-hidden="true">•</span>
                <span>{manga.score.toFixed(1)}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}