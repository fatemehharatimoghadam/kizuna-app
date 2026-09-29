import { useState } from "react";
import {
  Languages,
  LoaderCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { translateText } from "../../features/translation/translation.service";
import type { Manga } from "../../types/manga";

interface MangaSynopsisProps {
  manga: Manga;
}

export default function MangaSynopsis({
  manga,
}: MangaSynopsisProps) {
  const [translatedText, setTranslatedText] = useState<string | null>(
    null
  );
  const [showTranslation, setShowTranslation] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<
    string | null
  >(null);

  if (!manga.synopsis) {
    return null;
  }

  const synopsis = manga.synopsis;

  const handleTranslate = async () => {
    if (showTranslation) {
      setShowTranslation(false);
      setTranslationError(null);
      return;
    }

    if (translatedText) {
      setShowTranslation(true);
      setTranslationError(null);
      return;
    }

    try {
      setIsTranslating(true);
      setTranslationError(null);

      const result = await translateText({
        text: synopsis,
        targetLanguage: "fa",
      });

      setTranslatedText(result.translatedText);
      setShowTranslation(true);
    } catch (error) {
      console.error("Failed to translate synopsis:", error);

      setTranslationError(
        "Translation is temporarily unavailable. Please try again."
      );
    } finally {
      setIsTranslating(false);
    }
  };

  const displayedSynopsis =
    showTranslation && translatedText
      ? translatedText
      : synopsis;

  return (
    <section className="min-w-0">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-5 sm:p-7 lg:p-8">
        {/* Background atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(240,90,40,0.09),transparent_35%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 min-w-0">
          {/* Header */}
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-primary" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
                  Story
                </p>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                Synopsis
              </h2>
            </div>

            <button
              type="button"
              onClick={handleTranslate}
              disabled={isTranslating}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-ai/30
                bg-ai/10
                px-4
                py-3
                text-sm
                font-semibold
                text-foreground
                transition
                hover:border-ai/60
                hover:bg-ai/15
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
                sm:shrink-0
              "
            >
              {isTranslating ? (
                <>
                  <LoaderCircle
                    className="size-4 shrink-0 animate-spin text-ai"
                    aria-hidden="true"
                  />
                  <span>Translating...</span>
                </>
              ) : showTranslation ? (
                <>
                  <RotateCcw className="size-4 shrink-0 text-ai"
                    aria-hidden="true"
                  />
                  <span>Show Original</span>
                </>
              ) : (
                <>
                  <Languages
                    className="size-4 shrink-0 text-ai"
                    aria-hidden="true"
                  />
                  <span>Translate to Persian</span>
                </>
              )}
            </button>
          </div>

          {/* AI label */}
          <div className="mt-6 flex items-center gap-2 border-t border-border/70 pt-5">
            <Sparkles
              className="size-4 shrink-0 text-ai"
              aria-hidden="true"
            />

            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              AI Translation Available
            </span>
          </div>

          {translationError && (
            <div
              role="alert"
              className="mt-5 max-w-full overflow-hidden rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
            >
              <p className="break-words text-sm leading-6 text-primary">
                {translationError}
              </p>
            </div>
          )}

          {/* Synopsis text */}
          <div
            className={`mt-5 min-w-0 max-w-full rounded-2xl border px-5 py-5 sm:px-6 sm:py-6 ${
              showTranslation
                ? "border-ai/20 bg-ai/5"
                : "border-border/70 bg-surface/50"
            }`}
          >
            {showTranslation && (
              <div className="mb-4 flex justify-end">
                <span className="rounded-full border border-ai/20 bg-ai/10 px-3 py-1 text-xs font-semibold text-ai">
                  ترجمه فارسی
                </span>
              </div>
            )}

            <p
              dir={showTranslation ? "rtl" : "ltr"}
              lang={showTranslation ? "fa" : "en"}
              className={
                `max-w-full
                whitespace-normal
                break-words
                text-[15px]
                leading-8
                text-muted
                sm:text-base
                sm:leading-8
                ${
                  showTranslation
                    ? "text-right [overflow-wrap:anywhere]"
                    : "text-left"
                }
              `}
            >
              {displayedSynopsis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}