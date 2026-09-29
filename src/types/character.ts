import type { MangaImage } from "./manga";

export interface MangaCharacter {
  mal_id: number;
  url: string;

  images: {
    jpg: MangaImage;
    webp?: MangaImage;
  };

  name: string;
}

export interface MangaCharacterEntry {
  character: MangaCharacter;
  role: string;
}

export interface MangaCharactersResponse {
  data: MangaCharacterEntry[];
}