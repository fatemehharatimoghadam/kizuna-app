import {
  getMangaList,
  getMangaById,
  getFullMangaById,
  getMangaCharacters,
  getTopManga,
  getMangaGenres,
  getRandomManga,
} from "../api/manga.api";

import type {
  MangaListResponse,
  Manga,
} from "../types/manga";

import type {
  MangaCharacterEntry,
} from "../types/character";

import type {
  MangaGenre,
} from "../types/genre";

export async function fetchMangaList(
  params?: Record<string, unknown>
): Promise<MangaListResponse> {
  return getMangaList(params);
}

export async function fetchMangaDetail(
  id: number | string
): Promise<Manga> {
  return getMangaById(id);
}

export async function fetchFullMangaDetail(
  id: number | string
): Promise<Manga> {
  return getFullMangaById(id);
}

export async function fetchMangaCharacters(
  id: number | string
): Promise<MangaCharacterEntry[]> {
  return getMangaCharacters(id);
}

export async function fetchTopManga(
  params?: Record<string, unknown>
): Promise<MangaListResponse> {
  return getTopManga(params);
}

export async function fetchMangaGenres(): Promise<MangaGenre[]> {
  return getMangaGenres();
}

export async function fetchRandomManga(): Promise<Manga> {
  return getRandomManga();
}