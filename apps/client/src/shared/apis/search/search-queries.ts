import { queryOptions } from '@tanstack/react-query';

import { GetPerformancesSearchResponse } from '@shared/types/search-reponse';

import { getArtistSearch, getPerformancesSearch } from './search';

export const SEARCH_ARTIST_QUERY_KEY = {
  ALL: ['artist'],
  SEARCH_ARTIST: (keyword: string) => [
    ...SEARCH_ARTIST_QUERY_KEY.ALL,
    'search',
    keyword,
  ],
} as const;

export const SEARCH_ARTIST_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_ARTIST_QUERY_KEY.ALL }),
  SEARCH_ARTIST: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_ARTIST_QUERY_KEY.SEARCH_ARTIST(keyword),
    queryFn: () => getArtistSearch(keyword),
    enabled,
  }),
};

export const SEARCH_PERFORMANCES_QUERY_KEY = {
  ALL: ['performances'],
  SEARCH_PERFORMANCES: (artistId: string, cursor: number) => [
    ...SEARCH_PERFORMANCES_QUERY_KEY.ALL,
    'search',
    artistId,
    cursor,
  ],
} as const;

export const SEARCH_PERFORMANCES_QUERY_OPTION = {
  SEARCH_PERFORMANCES: (artistId: string, enabled: boolean) => ({
    queryKey: ['performances', artistId],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      getPerformancesSearch(artistId, pageParam),
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage: GetPerformancesSearchResponse) => {
      return lastPage.nextCursor !== -1 ? lastPage.nextCursor : undefined;
    },
  }),
};
