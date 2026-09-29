import { env } from "../config/env";
import type { Manga } from "../types/manga";
import { fetchMangaList } from "./manga.service";

interface DiscoveryPreferences {
  genres: number[];
  minScore: number | null;
  orderBy: "score" | "popularity";
  sort: "desc";
}

interface DiscoveryResponse {
  preferences: DiscoveryPreferences;
}

async function analyzeDiscoveryPrompt(
  prompt: string
): Promise<DiscoveryPreferences> {
  const response = await fetch(`${env.aiApiUrl}/api/discover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `AI discovery request failed with status ${response.status}.`
    );
  }

  const data = (await response.json()) as DiscoveryResponse;

  return data.preferences;
}

export async function findMangaByPrompt(
  prompt: string
): Promise<Manga[]> {
  const preferences = await analyzeDiscoveryPrompt(prompt);

  const response = await fetchMangaList({
    ...(preferences.genres.length > 0 && {
      genres: preferences.genres.join(","),
    }),
    ...(preferences.minScore !== null && {
      min_score: preferences.minScore,
    }),
    order_by: preferences.orderBy,
    sort: preferences.sort,
    limit: 10,
  });

  return response.data;
}