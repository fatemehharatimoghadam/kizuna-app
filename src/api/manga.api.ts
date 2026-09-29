import { apiClient } from "./client";
import { endpoints } from "./endpoints";

import type {
  Manga,
  MangaListResponse,
  MangaResponse,
} from "../types/manga";

import type {
  MangaCharacterEntry,
  MangaCharactersResponse,
} from "../types/character";

import type {
  MangaGenre,
  MangaGenresResponse,
} from "../types/genre";

export async function getMangaList(
  params?: Record<string, unknown>
): Promise<MangaListResponse> {
  const response = await apiClient.get<MangaListResponse>(
    endpoints.manga.list,
    {
      params,
    }
  );

  return response.data;
}

export async function getMangaById(
  id: number | string
): Promise<Manga> {
  const response = await apiClient.get<MangaResponse>(
    endpoints.manga.detail(id)
  );

  return response.data.data;
}

export async function getFullMangaById(
  id: number | string
): Promise<Manga> {
  const response = await apiClient.get<MangaResponse>(
    endpoints.manga.full(id)
  );

  return response.data.data;
}

export async function getMangaCharacters(
  id: number | string
): Promise<MangaCharacterEntry[]> {
  const response = await apiClient.get<MangaCharactersResponse>(
    endpoints.manga.characters(id)
  );

  return response.data.data;
}

export async function getTopManga(
  params?: Record<string, unknown>
): Promise<MangaListResponse> {
  const response = await apiClient.get<MangaListResponse>(
    endpoints.top.manga,
    {
      params,
    }
  );

  return response.data;
}

export async function getMangaGenres(): Promise<MangaGenre[]> {
  const response = await apiClient.get<MangaGenresResponse>(
    endpoints.genres.manga
  );

  return response.data.data;
}

export async function getRandomManga(): Promise<Manga> {
  const response = await apiClient.get<MangaResponse>(
    endpoints.random.manga
  );

  return response.data.data;
}