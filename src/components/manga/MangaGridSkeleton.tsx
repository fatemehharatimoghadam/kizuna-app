import MangaCardSkeleton from "./MangaCardSkeleton";

interface MangaGridSkeletonProps {
  count?: number;
}

export default function MangaGridSkeleton({
  count = 8,
}: MangaGridSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading manga"
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: count }).map((_, index) => (
        <MangaCardSkeleton key={index} />
      ))}

      <span className="sr-only">
        Loading manga...
      </span>
    </div>
  );
}