import { UserRound } from "lucide-react";

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
    <section className="min-w-0">
      {/* Section heading */}
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-primary" />

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
          Cast
        </p>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Characters
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Meet the characters in this story.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted sm:flex">
          <UserRound
            className="size-4 text-primary"
            aria-hidden="true"
          />

          <span>
            {characters.length}{" "}
            {characters.length === 1
              ? "character"
              : "characters"}
          </span>
        </div>
      </div>

      {/* Character grid */}
      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {characters.map(({ character, role }) => {
          const imageUrl =
            character.images.webp?.large_image_url ??
            character.images.jpg.large_image_url ??
            character.images.jpg.image_url;

          const isMainCharacter = role === "Main";

          return (
            <article
              key={character.mal_id}
              className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              {/* Character image */}
              <div className="relative aspect-[2/3] overflow-hidden bg-surface">
                <img
                  src={imageUrl}
                  alt={character.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Bottom gradient */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  aria-hidden="true"
                />

                {/* Character role */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${
                      isMainCharacter
                        ? "border-primary/40 bg-primary/20 text-white"
                        : "border-white/15 bg-black/50 text-white/80"
                    }`}
                  >
                    {role}
                  </span>
                </div>
              </div>

              {/* Character name */}
              <div className="min-w-0 p-4">
                <h3
                  className="truncate font-semibold text-foreground"
                  title={character.name}
                >
                  {character.name}
                </h3>

                <p className="mt-1.5 text-xs text-muted">
                  {isMainCharacter
                    ? "Main character"
                    : "Supporting character"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}