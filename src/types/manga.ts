export interface MangaImage {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface MangaResource {
  mal_id: number;
  type?: string;
  name: string;
  url?: string;
}

export interface MangaPublishedDate {
  from?: string | null;
  to?: string | null;
  string?: string;
}

export interface Manga {
  mal_id: number;

  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  title_synonyms?: string[];

  images: {
    jpg: MangaImage;
    webp?: MangaImage;
  };

  type?: string | null;
  chapters?: number | null;
  volumes?: number | null;

  status?: string | null;
  publishing?: boolean;

  score?: number | null;
  rank?: number | null;
  popularity?: number | null;

  synopsis?: string | null;
  background?: string | null;

  authors?: MangaResource[];
  serializations?: MangaResource[];
  genres?: MangaResource[];
  explicit_genres?: MangaResource[];
  themes?: MangaResource[];
  demographics?: MangaResource[];

  published?: MangaPublishedDate;
}

export interface MangaPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;

  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface MangaListResponse {
  pagination: MangaPagination;
  data: Manga[];
}

export interface MangaResponse {
  data: Manga;
}