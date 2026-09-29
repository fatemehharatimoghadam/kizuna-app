import type { Manga } from "../../types/manga";
import MangaCard from "./MangaCard";

interface MangaGridProps {
  manga: Manga[];
}

export default function MangaGrid({ manga }: MangaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {manga.map((item) => (
        <MangaCard
          key={item.mal_id}
          manga={item}
        />
      ))}
    </div>
  );
}