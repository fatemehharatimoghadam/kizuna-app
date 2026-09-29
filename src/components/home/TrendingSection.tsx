import { useEffect, useState } from "react";

import MangaCard from "../manga/MangaCard";
import MangaGridSkeleton from "../manga/MangaGridSkeleton";
import { fetchTopManga } from "../../services/manga.service";

import type { Manga } from "../../types/manga";

const TRENDING_LIMIT = 5;

export default function TrendingSection() {
  const [manga, setManga] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadTrendingManga = async () => {
      try {
        setHasError(false);

        const response = await fetchTopManga({
          limit: TRENDING_LIMIT,
        });

        setManga(response.data);
      } catch (error) {
        console.error(
          "Failed to load trending manga:",
          error
        );

        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingManga();
  }, []);

  return (
    <section
      id="trending"
      className="scroll-mt-20 border-t border-border py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Trending Now
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Stories readers are discovering
          </h2>

          <p className="mt-3 max-w-2xl text-muted">
            Explore some of the highest-ranked manga in
            KIZUNA.
          </p>
        </div>

        {isLoading && (
          <div className="mt-10">
            <MangaGridSkeleton count={TRENDING_LIMIT} />
          </div>
        )}

        {!isLoading && hasError && (
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted">
              Trending manga couldn't be loaded.
            </p>
          </div>
        )}

        {!isLoading &&
          !hasError &&
          manga.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {manga.map((item) => (
                <MangaCard
                  key={item.mal_id}
                  manga={item}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
}