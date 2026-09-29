export interface MangaImage {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface MangaGenre {
  mal_id: number;
  name: string;
  type?: string;
}

export interface Manga {
  mal_id: number;

  title: string;

  title_english?: string | null;

  title_synonyms?: string[];

  images: {
    jpg: MangaImage;
    webp?: MangaImage;
  };

  type?: string;

  chapters?: number | null;

  volumes?: number | null;

  status?: string;

  score?: number | null;

  rank?: number | null;

  popularity?: number | null;

  synopsis?: string | null;

  genres?: MangaGenre[];

  authors?: unknown[];

  published?: {
    from?: string | null;
    to?: string | null;
  };
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