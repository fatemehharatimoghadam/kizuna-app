import type { Manga } from "../../types/manga";

interface MangaDetailsProps {
  manga: Manga;
}

export default function MangaDetails({
  manga,
}: MangaDetailsProps) {
  const authors =
    manga.authors?.map((author) => author.name).join(", ") || "Unknown";

  const published = manga.published?.string ?? "Unknown";

  return (
    <section className="border-t border-border pt-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Information
      </p>

      <h2 className="mt-2 text-2xl font-bold text-foreground">
        Manga Details
      </h2>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-sm text-muted">
            Author
          </dt>

          <dd className="mt-2 font-medium text-foreground">
            {authors}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted">
            Published
          </dt>

          <dd className="mt-2 font-medium text-foreground">
            {published}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted">
            Rank
          </dt>

          <dd className="mt-2 font-medium text-foreground">
            {manga.rank != null ? `#${manga.rank}` : "—"}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-muted">
            Popularity
          </dt>

          <dd className="mt-2 font-medium text-foreground">
            {manga.popularity != null
              ? `#${manga.popularity}`
              : "—"}
          </dd>
        </div>
      </dl>

      {manga.themes && manga.themes.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-muted">
            Themes
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {manga.themes.map((theme) => (
              <span
                key={theme.mal_id}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
              >
                {theme.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {manga.demographics && manga.demographics.length > 0 && (
        <div className="mt-6">
          <p className="text-sm text-muted">
            Demographic
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {manga.demographics.map((demographic) => (
              <span
                key={demographic.mal_id}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
              >
                {demographic.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}