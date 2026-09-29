import type { MangaCharacterEntry } from "../../types/character";

interface MangaCharactersProps {
  characters: MangaCharacterEntry[];
}

export default function MangaCharacters({
  characters,
}: MangaCharactersProps) {
  if (characters.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border pt-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Cast
      </p>

      <h2 className="mt-2 text-2xl font-bold text-foreground">
        Characters
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {characters.map(({ character, role }) => {
          const imageUrl =
            character.images.webp?.large_image_url ??
            character.images.jpg.large_image_url ??
            character.images.jpg.image_url;

          return (
            <article
              key={character.mal_id}
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={imageUrl}
                  alt={character.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="line-clamp-1 font-semibold text-foreground">
                  {character.name}
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    role === "Main"
                      ? "text-primary"
                      : "text-muted"
                  }`}
                >
                  {role}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}