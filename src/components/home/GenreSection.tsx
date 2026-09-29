import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { fetchMangaGenres } from "../../services/manga.service";

import type { MangaGenre } from "../../types/genre";

export default function GenreSection() {
  const [genres, setGenres] = useState<MangaGenre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const result = await fetchMangaGenres();

        setGenres(result);
      } catch (error) {
        console.error("Failed to load manga genres:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadGenres();
  }, []);

  return (
    <section id="genres" className="scroll-mt-20 border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Explore Genres
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Find your next world
          </h2>

          <p className="mt-3 max-w-2xl text-muted">
            Explore manga by genre and discover stories that match
            what you want to read.
          </p>
        </div>

        {isLoading && (
          <p className="mt-10 text-muted">
            Loading genres...
          </p>
        )}

        {!isLoading && hasError && (
          <p className="mt-10 text-muted">
            Genres couldn't be loaded.
          </p>
        )}

        {!isLoading && !hasError && genres.length > 0 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {genres.map((genre) => (
              <Link
                key={genre.mal_id}
                to={`/search?genres=${genre.mal_id}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"
              >
                <div>
                  <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                    {genre.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted">
                    {genre.count} titles
                  </p>
                </div>

                <ArrowUpRight
                  className="size-5 text-muted transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}