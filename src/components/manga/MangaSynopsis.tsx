import { useState } from "react";
import {
  Languages,
  LoaderCircle,
  RotateCcw,
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
    <section className="border-t border-border pt-10">
      <div className="max-w-3xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Story
            </p>

            <h2 className="mt-2 text-2xl font-bold text-foreground">
              Synopsis
            </h2>
          </div>

          <button
            type="button"
            onClick={handleTranslate}
            disabled={isTranslating}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isTranslating ? (
              <>
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                Translating...
              </>
            ) : showTranslation ? (
              <>
                <RotateCcw
                  className="size-4"
                  aria-hidden="true"
                />
                Show Original
              </>
            ) : (
              <>
                <Languages
                  className="size-4"
                  aria-hidden="true"
                />
                Translate to Persian
              </>
            )}
          </button>
        </div>

        {translationError && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary"
          >
            {translationError}
          </p>
        )}

        <p
          dir={showTranslation ? "rtl" : "ltr"}
          lang={showTranslation ? "fa" : "en"}
          className={`mt-5 text-base leading-8 text-muted ${
            showTranslation ? "text-right" : ""
          }`}
        >
          {displayedSynopsis}
        </p>
      </div>
    </section>
  );
}