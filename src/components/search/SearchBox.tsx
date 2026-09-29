import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(trimmedQuery)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-border bg-surface p-1.5 sm:flex sm:items-center sm:p-0"
    >
      <div className="flex min-w-0 items-center sm:flex-1">
        <Search
          className="ml-3 size-5 shrink-0 text-muted sm:ml-4"
          aria-hidden="true"
        />

        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search manga..."
          aria-label="Search manga"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted sm:px-4 sm:py-4"
        />
      </div>

      <button
        type="submit"
        className="mt-1.5 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:m-1.5 sm:ml-0 sm:w-auto sm:shrink-0 sm:py-2.5"
      >
        Search
      </button>
    </form>
  );
}