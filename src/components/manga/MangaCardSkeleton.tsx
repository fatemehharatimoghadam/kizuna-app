export default function MangaCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card"
      aria-hidden="true"
    >
      <div className="aspect-[3/4] animate-pulse bg-border/50" />

      <div className="space-y-3 p-4">
        <div className="h-5 w-4/5 animate-pulse rounded-md bg-border/60" />

        <div className="flex items-center gap-2">
          <div className="h-4 w-14 animate-pulse rounded-md bg-border/50" />
          <div className="h-4 w-10 animate-pulse rounded-md bg-border/50" />
        </div>

        <div className="h-3 w-2/3 animate-pulse rounded-md bg-border/40" />
      </div>
    </div>
  );
}