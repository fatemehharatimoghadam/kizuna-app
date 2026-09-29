import {
  CalendarDays,
  Crown,
  Hash,
  PenLine,
  Tags,
  Users,
} from "lucide-react";

import type { Manga } from "../../types/manga";

interface MangaDetailsProps {
  manga: Manga;
}

export default function MangaDetails({
  manga,
}: MangaDetailsProps) {
  const authors =
    manga.authors?.map((author) => author.name).join(", ") ||
    "Unknown";

  const published = manga.published?.string ?? "Unknown";

  const rank =
    manga.rank != null ? `#${manga.rank}` : "—";

  const popularity =
    manga.popularity != null
      ? `#${manga.popularity}`
      : "—";

  return (
    <section className="min-w-0">
      {/* Section heading */}
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-primary" />

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
          Information
        </p>
      </div>

      <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
        Manga Details
      </h2>

      {/* Information table */}
      <dl className="mt-7 overflow-hidden rounded-2xl border border-border bg-card/50">
        <div className="grid md:grid-cols-2">
          {/* Author */}
          <div className="border-b border-border p-5 md:border-r sm:p-6">
            <dt className="flex items-center gap-2 text-sm text-muted">
              <PenLine
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Author
            </dt>

            <dd className="mt-3 break-words font-semibold leading-6 text-foreground">
              {authors}
            </dd>
          </div>

          {/* Published */}
          <div className="border-b border-border p-5 sm:p-6">
            <dt className="flex items-center gap-2 text-sm text-muted">
              <CalendarDays
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Published
            </dt>

            <dd className="mt-3 font-semibold leading-6 text-foreground">
              {published}
            </dd>
          </div>

          {/* Rank */}
          <div className="border-b border-border p-5 md:border-b-0 md:border-r sm:p-6">
            <dt className="flex items-center gap-2 text-sm text-muted">
              <Crown
                className="size-4 text-gold"
                aria-hidden="true"
              />
              Rank
            </dt>

            <dd className="mt-3 text-xl font-bold text-foreground">
              {rank}
            </dd>
          </div>

          {/* Popularity */}
          <div className="p-5 sm:p-6">
            <dt className="flex items-center gap-2 text-sm text-muted">
              <Hash
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Popularity
            </dt>

            <dd className="mt-3 text-xl font-bold text-foreground">
              {popularity}
            </dd>
          </div>
        </div>

        {/* Classification */}
        {((manga.themes && manga.themes.length > 0) ||
          (manga.demographics &&
            manga.demographics.length > 0)) && (
          <div className="grid border-t border-border md:grid-cols-2">
            {/* Themes */}
            <div className="border-b border-border p-5 md:border-b-0 md:border-r sm:p-6">
              <div className="flex items-center gap-2">
                <Tags
                  className="size-4 text-primary"
                  aria-hidden="true"
                />

                <p className="text-sm text-muted">
                  Themes
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {manga.themes &&
                manga.themes.length > 0 ? (
                  manga.themes.map((theme) => (
                    <span
                      key={theme.mal_id}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                    >
                      {theme.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted">
                    —
                  </span>
                )}
              </div>
            </div>

            {/* Demographic */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Users
                  className="size-4 text-primary"
                  aria-hidden="true"
                />

                <p className="text-sm text-muted">
                  Demographic
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {manga.demographics &&
                manga.demographics.length > 0 ? (
                  manga.demographics.map(
                    (demographic) => (
                      <span
                        key={demographic.mal_id}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                      >
                        {demographic.name}
                      </span>
                    )
                  )
                ) : (
                  <span className="text-sm text-muted">
                    —
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </dl>
    </section>
  );
}