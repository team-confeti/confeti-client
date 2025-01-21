import { queryOptions } from '@tanstack/react-query';
import { getMyArtists } from '@shared/apis/my/my';

export const MY_ARTISTS_QUERY_KEY = {
  ALL: ['my'],
  MY_ARTIST: () => [...MY_ARTISTS_QUERY_KEY.ALL, 'artist'],
} as const;

export const MY_ARTIST_QUERY_OPTIONS = {
  GET: () =>
    queryOptions({
      queryKey: MY_ARTISTS_QUERY_KEY.MY_ARTIST(),
      queryFn: getMyArtists,
    }),
};
