import { useState } from "react";
import {
  AlertCircle,
  LoaderCircle,
  SearchX,
} from "lucide-react";

import AIPromptForm from "../../components/ai/AIPromptForm";
import AIResults from "../../components/ai/AIResults";
import { findMangaByPrompt } from "../../services/ai.service";

import type { Manga } from "../../types/manga";

export default function AIPage() {
  const [results, setResults] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePromptSubmit = async (prompt: string) => {
    try {
      setIsLoading(true);
      setHasError(false);
      setHasSearched(false);
      setResults([]);

      const manga = await findMangaByPrompt(prompt);

      setResults(manga);
      setHasSearched(true);
    } catch (error) {
      console.error("Failed to find manga matches:", error);

      setResults([]);
      setHasSearched(true);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-ai">
              KIZUNA AI MATCH
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Find a story that feels right.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted">
              Describe the world, mood, characters, or themes you
              want to explore. KIZUNA will use your description to
              find manga that match what you are looking for.
            </p>
          </div>

          <div className="mt-10">
            <AIPromptForm
              onSubmit={handlePromptSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        {isLoading && (
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-10 text-center">
            <LoaderCircle
              className="size-7 animate-spin text-ai"
              aria-hidden="true"
            />

            <p className="mt-4 font-semibold text-foreground">
              Finding your KIZUNA matches...
            </p>

            <p className="mt-2 text-sm text-muted">
              AI is interpreting your mood, themes, and preferences.
            </p>
          </div>
        )}

        {!isLoading && hasError && (
          <div
            role="alert"
            className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-surface px-6 py-8 text-center"
          >
            <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <AlertCircle
                className="size-5 text-primary"
                aria-hidden="true"
              />
            </div>

            <p className="mt-4 font-semibold text-foreground">
              AI discovery is temporarily unavailable.
            </p>

            <p className="mt-2 text-sm leading-6 text-muted">
              We couldn't find your matches right now. Please try
              again in a moment.
            </p>
          </div>
        )}

        {!isLoading &&
          !hasError &&
          hasSearched &&
          results.length === 0 && (
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-surface px-6 py-8 text-center">
              <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-ai/20 bg-ai/10">
                <SearchX
                  className="size-5 text-ai"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 font-semibold text-foreground">
                No KIZUNA matches found.
              </p>

              <p className="mt-2 text-sm leading-6 text-muted">
                Try describing a different mood, genre, theme, or
                type of story.
              </p>
            </div>
          )}

        {!isLoading &&
          !hasError &&
          results.length > 0 && (
            <div className="mt-16">
              <AIResults manga={results} />
            </div>
          )}
      </section>
    </main>
  );
}