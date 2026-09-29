import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import MangaCard from "../manga/MangaCard";
import MangaGridSkeleton from "../manga/MangaGridSkeleton";
import { fetchTopManga } from "../../services/manga.service";

import type { Manga } from "../../types/manga";

const TRENDING_LIMIT = 12;

export default function TrendingSection() {
  const [manga, setManga] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || manga.length === 0) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft =
        carousel.scrollWidth - carousel.clientWidth;

      setCanScrollLeft(carousel.scrollLeft > 2);

      setCanScrollRight(
        carousel.scrollLeft < maxScrollLeft - 2
      );
    };

    updateScrollState();

    carousel.addEventListener(
      "scroll",
      updateScrollState,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScrollState
    );

    return () => {
      carousel.removeEventListener(
        "scroll",
        updateScrollState
      );

      window.removeEventListener(
        "resize",
        updateScrollState
      );
    };
  }, [manga]);

  const scrollCarousel = (
    direction: "left" | "right"
  ) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const firstCard = carousel.firstElementChild;

    if (!(firstCard instanceof HTMLElement)) {
      return;
    }

    const styles = window.getComputedStyle(carousel);
    const gap =
      Number.parseFloat(styles.columnGap) || 16;

    const scrollAmount =
      firstCard.getBoundingClientRect().width + gap;

    carousel.scrollBy({
      left:
        direction === "right"
          ? scrollAmount
          : -scrollAmount,
      behavior: "smooth",
    });
  };

  const renderControls = (mobile = false) => (
    <div
      className={
        mobile
          ? "flex items-center gap-2"
          : "hidden shrink-0 items-center gap-2 sm:flex"
      }
    >
      <button
        type="button"
        onClick={() => scrollCarousel("left")}
        disabled={!canScrollLeft}
        className="
          flex
          size-11
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-card
          text-foreground
          transition
          hover:border-primary/50
          hover:bg-primary
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-30
          disabled:hover:border-border
          disabled:hover:bg-card
          disabled:hover:text-foreground
        "
        aria-label="Previous manga"
      >
        <ChevronLeft
          className="size-5"
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={() => scrollCarousel("right")}
        disabled={!canScrollRight}
        className="
          flex
          size-11
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-card
          text-foreground
          transition
          hover:border-primary/50
          hover:bg-primary
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-30
          disabled:hover:border-border
          disabled:hover:bg-card
          disabled:hover:text-foreground
        "
        aria-label="Next manga"
      >
        <ChevronRight
          className="size-5"
          aria-hidden="true"
        />
      </button>
    </div>
  );

  return (
    <section
      id="trending"
      className="scroll-mt-20 border-t border-border py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
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

          {!isLoading &&
            !hasError &&
            manga.length > 0 &&
            renderControls()}
        </div>

        {isLoading && (
          <div className="mt-10">
            <MangaGridSkeleton count={5} />
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
            <>
              <div
                ref={carouselRef}
                className="
                  mt-10
                  flex
                  snap-x
                  snap-mandatory
                  gap-4
                  overflow-x-auto
                  scroll-smooth
                  pb-4
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                  sm:gap-5
                "
              >
                {manga.map((item) => (
                  <div
                    key={item.mal_id}
                    className="
                      w-[72%]
                      shrink-0
                      snap-start
                      sm:w-[42%]
                      md:w-[30%]
                      lg:w-[calc((100%-5rem)/5)]
                    "
                  >
                    <MangaCard manga={item} />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between sm:hidden">
                <p className="text-xs text-muted">
                  Swipe to explore
                </p>

                {renderControls(true)}
              </div>
            </>
          )}
      </div>
    </section>
  );
}