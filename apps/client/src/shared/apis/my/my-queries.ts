import { queryOptions } from '@tanstack/react-query';
import { getFavoriteArtists } from '@shared/apis/my/my';

export const FAVORITE_ARTISTS_QUERY_KEY = {
  ALL: ['my'],
  MY_ARTIST: () => [...FAVORITE_ARTISTS_QUERY_KEY.ALL, 'artist'],
} as const;

export const FAVORITE_ARTIST_QUERY_OPTIONS = {
  GET: () =>
    queryOptions({
      queryKey: FAVORITE_ARTISTS_QUERY_KEY.MY_ARTIST(),
      queryFn: getFavoriteArtists,
    }),
};
