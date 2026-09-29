import { SearchX } from "lucide-react";

interface SearchEmptyStateProps {
  query: string;
}

export default function SearchEmptyState({
  query,
}: SearchEmptyStateProps) {
  return (
    <section className="mt-12 flex min-h-[320px] items-center justify-center rounded-2xl border border-border bg-surface px-6 py-12 text-center">
      <div className="max-w-md">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-card">
          <SearchX
            className="size-6 text-primary"
            aria-hidden="true"
          />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-foreground">
          No manga found
        </h2>

        <p className="mt-3 leading-7 text-muted">
          We couldn't find any manga matching{" "}
          <span className="font-medium text-foreground">
            &quot;{query}&quot;
          </span>
          .
        </p>

        <p className="mt-1 text-sm text-muted">
          Try another title or use a shorter search term.
        </p>
      </div>
    </section>
  );
}