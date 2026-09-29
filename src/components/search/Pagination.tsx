import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const changePage = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("page", String(page));
    setSearchParams(nextParams);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className="flex items-center justify-center gap-4"
      aria-label="Search results pagination"
    >
      <button
        type="button"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft
          className="size-4"
          aria-hidden="true"
        />
        Previous
      </button>

      <span className="text-sm text-muted">
        Page{" "}
        <span className="font-semibold text-foreground">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">
          {totalPages}
        </span>
      </span>

      <button
        type="button"
        onClick={() => changePage(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight
          className="size-4"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}