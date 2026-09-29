export interface MangaGenre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export interface MangaGenresResponse {
  data: MangaGenre[];
}