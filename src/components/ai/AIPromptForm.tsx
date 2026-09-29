import { useState } from "react";
import { Sparkles } from "lucide-react";

interface AIPromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export default function AIPromptForm({
  onSubmit,
  isLoading = false,
}: AIPromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isLoading) {
      return;
    }

    onSubmit(trimmedPrompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <label
        htmlFor="ai-prompt"
        className="text-sm font-medium text-foreground"
      >
        What kind of manga are you looking for?
      </label>

      <textarea
        id="ai-prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Example: A dark fantasy story with a lonely hero, mystery, and psychological themes..."
        rows={6}
        maxLength={500}
        disabled={isLoading}
        className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-4 py-4 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted focus:border-ai disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="text-xs text-muted">
          {prompt.length}/500
        </span>

        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-ai px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles
            className="size-4"
            aria-hidden="true"
          />

          {isLoading ? "Finding matches..." : "Find My Manga"}
        </button>
      </div>
    </form>
  );
}