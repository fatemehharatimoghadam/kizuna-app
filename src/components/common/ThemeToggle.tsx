import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "kizuna-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY
    ) as Theme | null;

    return savedTheme ?? "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      title={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-primary hover:text-primary"
    >
      {isDark ? (
        <Sun
          className="size-4"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="size-4"
          aria-hidden="true"
        />
      )}
    </button>
  );
}