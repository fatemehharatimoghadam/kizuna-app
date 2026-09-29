export const endpoints = {
  manga: {
    list: "/manga",
    detail: (id: number | string) => `/manga/${id}`,
    full: (id: number | string) => `/manga/${id}/full`,
    characters: (id: number | string) => `/manga/${id}/characters`,
  },

  top: {
    manga: "/top/manga",
  },

  genres: {
    manga: "/genres/manga",
  },

  random: {
    manga: "/random/manga",
  },
} as const;