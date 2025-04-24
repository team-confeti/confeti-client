import { queryOptions } from '@tanstack/react-query';

import {
  getArtistRelatedKeyword,
  getArtistRelatedPerformances,
  getArtistSearch,
  getPerformanceRelatedKeyword,
} from './search';

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
  SEARCH_RELATED_KEYWORD: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_ARTIST_QUERY_KEY.SEARCH_ARTIST(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword),
    enabled,
  }),
};

export const SEARCH_PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
  SEARCH_PERFORMANCES: (keyword: string) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    'search',
    keyword,
  ],
} as const;

export const SEARCH_PERFORMANCE_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_PERFORMANCE_QUERY_KEY.ALL }),
  SEARCH_RELATED_PERFORMANCES: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_PERFORMANCE_QUERY_KEY.SEARCH_PERFORMANCES(keyword),
    queryFn: () => getPerformanceRelatedKeyword(keyword),
    enabled,
  }),
};

// TODO: 추후 삭제 예정
export const SEARCH_ARTIST_RELATED_QUERY_KEY = {
  ALL: ['performances'],
  SEARCH_RELATED_PERFORMANCES: (artistId: string | null) => [
    ...SEARCH_ARTIST_RELATED_QUERY_KEY.ALL,
    'search',
    artistId,
  ],
} as const;

// TODO: 추후 삭제 예정
export const SEARCH_ARTIST_RELATED_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_ARTIST_RELATED_QUERY_KEY.ALL }),
  SEARCH_RELATED_PERFORMANCES: (artistId: string | null) => ({
    queryKey:
      SEARCH_ARTIST_RELATED_QUERY_KEY.SEARCH_RELATED_PERFORMANCES(artistId),
    queryFn: () => getArtistRelatedPerformances(artistId),
  }),
};
