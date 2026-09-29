import type { MangaGenre } from "../../types/genre";

interface SearchFiltersProps {
  genres: MangaGenre[];
  genre: string;
  type: string;
  status: string;
  minScore: string;
  orderBy: string;
  sort: string;

  onGenreChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMinScoreChange: (value: string) => void;
  onOrderByChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const selectClassName =
  "w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary";

export default function SearchFilters({
  genres,
  genre,
  type,
  status,
  minScore,
  orderBy,
  sort,
  onGenreChange,
  onTypeChange,
  onStatusChange,
  onMinScoreChange,
  onOrderByChange,
  onSortChange,
  onReset,
}: SearchFiltersProps) {
  return (
    <aside className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-foreground">
          Filters
        </h2>

        <button
          type="button"
          onClick={onReset}
          className="text-sm text-muted transition-colors hover:text-primary"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {/* Genre */}
        <div>
          <label
            htmlFor="manga-genre"
            className="mb-2 block text-sm text-muted"
          >
            Genre
          </label>

          <select
            id="manga-genre"
            value={genre}
            onChange={(event) =>
              onGenreChange(event.target.value)
            }
            className={selectClassName}
          >
            <option value="">All genres</option>

            {genres.map((item) => (
              <option
                key={item.mal_id}
                value={item.mal_id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor="manga-type"
            className="mb-2 block text-sm text-muted"
          >
            Type
          </label>

          <select
            id="manga-type"
            value={type}
            onChange={(event) =>
              onTypeChange(event.target.value)
            }
            className={selectClassName}
          >
            <option value="">All types</option>
            <option value="manga">Manga</option>
            <option value="novel">Novel</option>
            <option value="lightnovel">Light Novel</option>
            <option value="oneshot">One-shot</option>
            <option value="doujin">Doujinshi</option>
            <option value="manhwa">Manhwa</option>
            <option value="manhua">Manhua</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="manga-status"
            className="mb-2 block text-sm text-muted"
          >
            Status
          </label>

          <select
            id="manga-status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
            className={selectClassName}
          >
            <option value="">All statuses</option>
            <option value="publishing">Publishing</option>
            <option value="complete">Completed</option>
            <option value="hiatus">On Hiatus</option>
            <option value="discontinued">
              Discontinued
            </option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Minimum Score */}
        <div>
          <label
            htmlFor="minimum-score"
            className="mb-2 block text-sm text-muted"
          >
            Minimum Score
          </label>
          <select
            id="minimum-score"
            value={minScore}
            onChange={(event) =>
              onMinScoreChange(event.target.value)
            }
            className={selectClassName}
          >
            <option value="">Any score</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="order-by"
            className="mb-2 block text-sm text-muted"
          >
            Sort By
          </label>

          <select
            id="order-by"
            value={orderBy}
            onChange={(event) =>
              onOrderByChange(event.target.value)
            }
            className={selectClassName}
          >
            <option value="">Default</option>
            <option value="score">Score</option>
            <option value="rank">Rank</option>
            <option value="popularity">
              Popularity
            </option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Sort Direction */}
        <div>
          <label
            htmlFor="sort-direction"
            className="mb-2 block text-sm text-muted"
          >
            Direction
          </label>

          <select
            id="sort-direction"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
            className={selectClassName}
            disabled={!orderBy}
          >
            <option value="desc">
              Descending
            </option>
            <option value="asc">
              Ascending
            </option>
          </select>
        </div>
      </div>
    </aside>
  );
}