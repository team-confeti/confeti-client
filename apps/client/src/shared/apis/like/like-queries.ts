export const LIKE_QUERY_KEY = {
  ALL: ['like'],
  LIKE_ARTIST: (artistId: string) => [
    ...LIKE_QUERY_KEY.ALL,
    'artist',
    artistId,
  ],
  LIKE_FESTIVAL: (typeId: number) => [
    ...LIKE_QUERY_KEY.ALL,
    'festival',
    typeId,
  ],
  LIKE_CONCERT: (typeId: number) => [...LIKE_QUERY_KEY.ALL, 'concert', typeId],
} as const;
