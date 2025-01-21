import { queryOptions } from '@tanstack/react-query';
import { getArtistSearch, getPerformanceSearch } from './search';

export const SEARCH_ARTIST_QUERY_KEY = {
  ALL: ['artist'],
  SEARCH_ARTIST: (keyword: string) => [
    ...SEARCH_ARTIST_QUERY_KEY.ALL,
    'keyword',
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

// 공연정보 검색

export const SEARCH_PERFOMANCE_QUERY_KEY = {
  ALL: ['performance'],
  SEARCH_PERFORMANCE: (artistId: string, cursor: number) => [
    ...SEARCH_ARTIST_QUERY_KEY.ALL,
    artistId,
    cursor,
  ],
} as const;

export const SEARCH_PERFOMANCE_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_PERFOMANCE_QUERY_KEY.ALL }),
  SEARCH_PERFORMANCE: (artistId: string, cursor: number) => ({
    queryKey: SEARCH_PERFOMANCE_QUERY_KEY.SEARCH_PERFORMANCE(artistId, cursor),
    queryFn: () => getPerformanceSearch(artistId, cursor),
  }),
};
