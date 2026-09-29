import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MangaGrid from "../../components/manga/MangaGrid";
import MangaGridSkeleton from "../../components/manga/MangaGridSkeleton";
import Pagination from "../../components/search/Pagination";
import SearchEmptyState from "../../components/search/SearchEmptyState";
import SearchFilters from "../../components/search/SearchFilters";

import {
  fetchMangaGenres,
  fetchMangaList,
} from "../../services/manga.service";

import type { MangaGenre } from "../../types/genre";
import type {
  Manga,
  MangaPagination,
} from "../../types/manga";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() ?? "";
  const genre = searchParams.get("genres")?.trim() ?? "";
  const type = searchParams.get("type") ?? "";
  const status = searchParams.get("status") ?? "";
  const minScore = searchParams.get("min_score") ?? "";
  const orderBy = searchParams.get("order_by") ?? "";
  const sort = searchParams.get("sort") ?? "desc";

  const pageParam = Number(searchParams.get("page"));

  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0
      ? pageParam
      : 1;

  const hasFilters = Boolean(
    type || status || minScore || orderBy
  );

  const hasSearchCriteria = Boolean(
    query || genre || hasFilters
  );

  const [manga, setManga] = useState<Manga[]>([]);
  const [genres, setGenres] = useState<MangaGenre[]>([]);
  const [pagination, setPagination] =
    useState<MangaPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadGenres = async () => {
      try {
        const result = await fetchMangaGenres();

        if (isActive) {
          setGenres(result);
        }
      } catch (error) {
        console.error(
          "Failed to load manga genres:",
          error
        );

        if (isActive) {
          setGenres([]);
        }
      }
    };

    loadGenres();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!hasSearchCriteria) {
      return;
    }

    let isActive = true;

    const loadManga = async () => {
      try {
        setIsLoading(true);

        const response = await fetchMangaList({
          ...(query && { q: query }),
          ...(genre && { genres: genre }),
          ...(type && { type }),
          ...(status && { status }),
          ...(minScore && {
            min_score: Number(minScore),
          }),
          ...(orderBy && {
            order_by: orderBy,
            sort,
          }),
          page: currentPage,
        });

        if (!isActive) {
          return;
        }

        setManga(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error(
          "Failed to search manga:",
          error
        );

        if (!isActive) {
          return;
        }

        setManga([]);
        setPagination(null);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadManga();

    return () => {
      isActive = false;
    };
  }, [
    query,
    genre,
    type,
    status,
    minScore,
    orderBy,
    sort,
    currentPage,
    hasSearchCriteria,
  ]);

  const updateFilter = (
    key: string,
    value: string
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    nextParams.delete("page");

    if (key === "order_by" && !value) {
      nextParams.delete("sort");
    }

    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    const nextParams = new URLSearchParams();

    if (query) {
      nextParams.set("q", query);
    }

    setSearchParams(nextParams);
  };

  const hasResults =
    hasSearchCriteria && manga.length > 0;
    const hasNoResults =
    !isLoading &&
    hasSearchCriteria &&
    pagination !== null &&
    manga.length === 0;

  const selectedGenre = genres.find(
    (item) => String(item.mal_id) === genre
  );

  const pageTitle = query
    ? `Results for "${query}"`
    : selectedGenre
      ? `${selectedGenre.name} Manga`
      : hasFilters
        ? "Explore Manga"
        : "Search Manga";

  const emptyStateLabel = query
    ? query
    : selectedGenre
      ? selectedGenre.name
      : "these filters";

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        {genre && !query ? "Genre" : "Search"}
      </p>

      <h1 className="mt-3 text-3xl font-bold text-foreground">
        {pageTitle}
      </h1>

      {!isLoading &&
        hasSearchCriteria &&
        pagination && (
          <p className="mt-3 text-muted">
            {pagination.items.total} manga found
          </p>
        )}

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div>
          <SearchFilters
            genres={genres}
            genre={genre}
            type={type}
            status={status}
            minScore={minScore}
            orderBy={orderBy}
            sort={sort}
            onGenreChange={(value) =>
              updateFilter("genres", value)
            }
            onTypeChange={(value) =>
              updateFilter("type", value)
            }
            onStatusChange={(value) =>
              updateFilter("status", value)
            }
            onMinScoreChange={(value) =>
              updateFilter("min_score", value)
            }
            onOrderByChange={(value) =>
              updateFilter("order_by", value)
            }
            onSortChange={(value) =>
              updateFilter("sort", value)
            }
            onReset={handleResetFilters}
          />
        </div>

        <div className="min-w-0">
          {isLoading && hasSearchCriteria && (
            <MangaGridSkeleton count={10} />
          )}

          {!isLoading &&
            hasSearchCriteria &&
            hasResults && (
              <>
                <MangaGrid manga={manga} />

                {pagination &&
                  pagination.last_visible_page > 1 && (
                    <div className="mt-12">
                      <Pagination
                        currentPage={
                          pagination.current_page
                        }
                        totalPages={
                          pagination.last_visible_page
                        }
                        hasNextPage={
                          pagination.has_next_page
                        }
                      />
                    </div>
                  )}
              </>
            )}

          {hasNoResults && (
            <SearchEmptyState
              query={emptyStateLabel}
            />
          )}

          {!isLoading && !hasSearchCriteria && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted">
                Search for a manga or choose filters to
                start exploring.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}