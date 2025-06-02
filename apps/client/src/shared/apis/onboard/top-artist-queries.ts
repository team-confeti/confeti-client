import { queryOptions } from '@tanstack/react-query';

import { TOP_100_ARTIST_QUERY_KEY } from '@shared/constants/query-key';

import { getTopArtist } from './top-artist';

export const TOP_ARTIST_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: TOP_100_ARTIST_QUERY_KEY.ALL }),
  TOP_ARTIST: (limit: number) =>
    queryOptions({
      queryKey: TOP_100_ARTIST_QUERY_KEY.TOP_ARTIST(limit),
      queryFn: () => getTopArtist(limit),
    }),
};
