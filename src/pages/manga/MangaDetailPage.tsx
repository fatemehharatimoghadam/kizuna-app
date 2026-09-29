import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import MangaCharacters from "../../components/manga/MangaCharacters";
import MangaDetailSkeleton from "../../components/manga/MangaDetailSkeleton";
import MangaDetails from "../../components/manga/MangaDetails";
import MangaHero from "../../components/manga/MangaHero";
import MangaSynopsis from "../../components/manga/MangaSynopsis";

import {
  fetchMangaCharacters,
  fetchMangaDetail,
} from "../../services/manga.service";

import type { MangaCharacterEntry } from "../../types/character";
import type { Manga } from "../../types/manga";

export default function MangaDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [manga, setManga] = useState<Manga | null>(null);
  const [characters, setCharacters] = useState<
    MangaCharacterEntry[]
  >([]);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isActive = true;

    const loadManga = async () => {
      try {
        const [mangaResult, charactersResult] =
          await Promise.all([
            fetchMangaDetail(id),
            fetchMangaCharacters(id),
          ]);

        if (!isActive) {
          return;
        }

        setManga(mangaResult);
        setCharacters(charactersResult);
        setError(null);
      } catch (error) {
        console.error(
          "Failed to load manga details:",
          error
        );

        if (!isActive) {
          return;
        }

        setManga(null);
        setCharacters([]);
        setError(
          "We couldn't load this manga right now."
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadManga();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (!id) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <AlertCircle
              className="size-5 text-primary"
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Manga unavailable
          </p>

          <h1 className="mt-3 text-2xl font-bold text-foreground">
            We couldn't open this story.
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">
            Manga not found.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ArrowLeft
              className="size-4"
              aria-hidden="true"
            />
            Back to Discover
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
        <MangaDetailSkeleton />
      </main>
    );
  }

  if (error || !manga) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <AlertCircle
              className="size-5 text-primary"
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Manga unavailable
          </p>
          <h1 className="mt-3 text-2xl font-bold text-foreground">
            We couldn't open this story.
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">
            {error ?? "Manga not found."}
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ArrowLeft
              className="size-4"
              aria-hidden="true"
            />
            Back to Discover
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <MangaHero manga={manga} />

      <div className="mt-16">
        <MangaSynopsis manga={manga} />
      </div>

      <div className="mt-12">
        <MangaDetails manga={manga} />
      </div>

      <div className="mt-12">
        <MangaCharacters characters={characters} />
      </div>
    </main>
  );
}