import { queryOptions } from '@tanstack/react-query';

import { IntendedPerformanceRequest } from '@shared/types/search-reponse';

import {
  getArtistRelatedKeyword,
  getArtistRelatedPerformances,
  getArtistSearch,
  getIntendedPerformance,
  getPerformanceRelatedKeyword,
  getPerformanceTypeAnalysis,
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
  SEARCH_INTENDED_PERFORMANCE: (
    request: IntendedPerformanceRequest,
    enabled: boolean,
  ) => ({
    queryKey: SEARCH_PERFORMANCE_QUERY_KEY.SEARCH_INTENDED_PERFORMANCE(request),
    queryFn: () => getIntendedPerformance(request),
    enabled,
  }),
};
