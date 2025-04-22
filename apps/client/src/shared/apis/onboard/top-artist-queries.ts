import { queryOptions } from '@tanstack/react-query';

import { getTopArtist } from './top-artist';

export const TOP_100_ARTIST_QUERY_KEY = {
  ALL: ['top-artist'],
  TOP_ARTIST: (limit: number) => [
    ...TOP_100_ARTIST_QUERY_KEY.ALL,
    'top-artist',
    limit,
  ],
} as const;

export const TOP_ARTIST_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: TOP_100_ARTIST_QUERY_KEY.ALL }),
  TOP_ARTIST: (limit: number) =>
    queryOptions({
      queryKey: TOP_100_ARTIST_QUERY_KEY.TOP_ARTIST(limit),
      queryFn: () => getTopArtist(limit),
    }),
};
