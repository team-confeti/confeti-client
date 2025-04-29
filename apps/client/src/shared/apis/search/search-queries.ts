import { queryOptions } from '@tanstack/react-query';

import { IntendedPerformanceRequest } from '@shared/types/search-reponse';

import {
  getArtistRelatedKeyword,
  getArtistSearch,
  getIntendedPerformance,
  getPerformanceRelatedKeyword,
  getPerformanceTypeAnalysis,
  getPopularSearch,
  getRecentView,
} from './search';

export const SEARCH_PAGE_QUERY_KEY = {
  ALL: ['search'],
  SEARCH_POPULAR_SEARCH: () => [...SEARCH_PAGE_QUERY_KEY.ALL, 'popular'],
  RECENT_VIEW: (items: string) => [
    ...SEARCH_PAGE_QUERY_KEY.ALL,
    'recent',
    items,
  ],
} as const;

export const SEARCH_PAGE_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_PAGE_QUERY_KEY.ALL }),
  SEARCH_POPULAR_SEARCH: () => ({
    queryKey: SEARCH_PAGE_QUERY_KEY.SEARCH_POPULAR_SEARCH(),
    // TODO: limit 상수 처리
    queryFn: () => getPopularSearch(10),
  }),
  RECENT_VIEW: (items: string, enabled: boolean) => ({
    queryKey: SEARCH_PAGE_QUERY_KEY.RECENT_VIEW(items),
    queryFn: () => getRecentView(items),
    enabled,
  }),
};

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
  SEARCH_PERFORMANCE_TYPE_ANALYSIS: (keyword: string) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    'type-analysis',
    keyword,
  ],
  SEARCH_INTENDED_PERFORMANCE: (request: IntendedPerformanceRequest) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    'intended',
    request.pid,
    request.aid,
    request.ptitle,
    request.ptype,
  ],
} as const;

export const SEARCH_PERFORMANCE_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: SEARCH_PERFORMANCE_QUERY_KEY.ALL }),
  SEARCH_RELATED_PERFORMANCES: (keyword: string, enabled: boolean) => ({
    queryKey: SEARCH_PERFORMANCE_QUERY_KEY.SEARCH_PERFORMANCES(keyword),
    queryFn: () => getPerformanceRelatedKeyword(keyword),
    enabled,
  }),
  SEARCH_PERFORMANCE_TYPE_ANALYSIS: (keyword: string, enabled: boolean) => ({
    queryKey:
      SEARCH_PERFORMANCE_QUERY_KEY.SEARCH_PERFORMANCE_TYPE_ANALYSIS(keyword),
    queryFn: () => getPerformanceTypeAnalysis(keyword),
    enabled,
  }),
  SEARCH_INTENDED_PERFORMANCE: (request: IntendedPerformanceRequest) => ({
    queryKey: SEARCH_PERFORMANCE_QUERY_KEY.SEARCH_INTENDED_PERFORMANCE(request),
    queryFn: () => getIntendedPerformance(request),
  }),
};
