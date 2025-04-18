import { queryOptions } from '@tanstack/react-query';

import { getTopArtist } from './top-artist';

export const TOP_100_ARTIST_QUERY_KEY = {
  ALL: ['top-artist'],
  TOP_ARTIST: () => [...TOP_100_ARTIST_QUERY_KEY.ALL, 'top-artist'],
} as const;

export const TOP_ARTIST_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: TOP_100_ARTIST_QUERY_KEY.ALL }),
  TOP_ARTIST: () =>
    queryOptions({
      queryKey: TOP_100_ARTIST_QUERY_KEY.TOP_ARTIST(),
      queryFn: getTopArtist,
    }),
};
