export default function MangaDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading manga details"
      className="animate-pulse"
    >
      {/* Hero */}
      <div className="grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        {/* Cover */}
        <div className="mx-auto w-full max-w-[240px] md:mx-0">
          <div className="aspect-[2/3] rounded-2xl bg-border/50" />
        </div>

        {/* Main information */}
        <div className="flex flex-col justify-center">
          <div className="h-4 w-24 rounded bg-border/50" />

          <div className="mt-5 h-10 w-4/5 max-w-xl rounded-lg bg-border/60" />

          <div className="mt-3 h-5 w-2/5 max-w-xs rounded bg-border/40" />

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="h-9 w-20 rounded-lg bg-border/50" />
            <div className="h-9 w-24 rounded-lg bg-border/50" />
            <div className="h-9 w-28 rounded-lg bg-border/50" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-7 w-20 rounded-full bg-border/40" />
            <div className="h-7 w-24 rounded-full bg-border/40" />
            <div className="h-7 w-16 rounded-full bg-border/40" />
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <div className="mt-16">
        <div className="h-7 w-32 rounded bg-border/60" />

        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-border/40" />
          <div className="h-4 w-full rounded bg-border/40" />
          <div className="h-4 w-11/12 rounded bg-border/40" />
          <div className="h-4 w-4/5 rounded bg-border/40" />
        </div>
      </div>

      {/* Details */}
      <div className="mt-12">
        <div className="h-7 w-28 rounded bg-border/60" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="h-3 w-16 rounded bg-border/40" />
              <div className="mt-3 h-5 w-24 rounded bg-border/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Characters */}
      <div className="mt-12">
        <div className="h-7 w-36 rounded bg-border/60" />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="aspect-[3/4] bg-border/50" />

              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-border/60" />
                <div className="h-3 w-1/2 rounded bg-border/40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">
        Loading manga details...
      </span>
    </div>
  );
}