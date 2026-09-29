import MangaGrid from "../manga/MangaGrid";

import type { Manga } from "../../types/manga";

interface AIResultsProps {
  manga: Manga[];
}

export default function AIResults({
  manga,
}: AIResultsProps) {
  if (manga.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border pt-12">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ai">
          AI Matches
        </p>

        <h2 className="mt-2 text-2xl font-bold text-foreground">
          Stories matched to your description
        </h2>

        <p className="mt-3 text-muted">
          We found {manga.length} manga based on the themes
          and mood in your request.
        </p>
      </div>

      <div className="mt-8">
        <MangaGrid manga={manga} />
      </div>
    </section>
  );
}