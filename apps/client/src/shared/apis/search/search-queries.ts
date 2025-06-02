import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import {
  SEARCH_ARTIST_QUERY_KEY,
  SEARCH_PAGE_QUERY_KEY,
  SEARCH_PERFORMANCE_QUERY_KEY,
} from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearchResponse,
  IntendedPerformanceRequest,
  IntendedPerformanceResponse,
  PerformanceTypeAnalysis,
  PopularSearchResponse,
  RecentPerformanceViewResponse,
  RelatedArtistResponse,
  RelatedPerformanceResponse,
} from '@shared/types/search-reponse';

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

export const getArtistSearch = async (
  keyword: string,
): Promise<ArtistSearchResponse> => {
  const response = await get<BaseResponse<ArtistSearchResponse>>(
    `${END_POINT.GET_ARTISTS_SEARCH}${encodeURIComponent(keyword)}`,
  );
  return response.data;
};

export const getArtistRelatedKeyword = async (
  keyword: string,
): Promise<RelatedArtistResponse> => {
  const response = await get<BaseResponse<RelatedArtistResponse>>(
    `${END_POINT.GET_ARTISTS_SEARCH_RELATED_KEYWORD(keyword, 3)}`,
  );
  return response.data;
};

export const getPerformanceRelatedKeyword = async (
  keyword: string,
): Promise<RelatedPerformanceResponse> => {
  const response = await get<BaseResponse<RelatedPerformanceResponse>>(
    `${END_POINT.GET_PERFORMANCES_SEARCH_RELATED_KEYWORD(keyword, 3)}`,
  );
  return response.data;
};

export const getPerformanceTypeAnalysis = async (
  keyword: string,
): Promise<PerformanceTypeAnalysis> => {
  const response = await get<BaseResponse<PerformanceTypeAnalysis>>(
    `${END_POINT.GET_PERFORMANCE_TYPE_ANALYSIS(keyword)}`,
  );
  return response.data;
};

export const getIntendedPerformance = async (
  request: IntendedPerformanceRequest,
): Promise<IntendedPerformanceResponse> => {
  const { pid, aid, ptitle, ptype } = request;

  const query = new URLSearchParams();

  if (pid !== null) query.append('pid', String(pid));
  if (aid !== null) query.append('aid', aid);
  if (ptitle !== null) query.append('ptitle', ptitle);
  if (ptype !== null) query.append('ptype', ptype);

  const url = `performances/search?${query.toString()}`;

  const response = await get<BaseResponse<IntendedPerformanceResponse>>(url);
  return response.data;
};

export const getPopularSearch = async (
  limit: number,
): Promise<PopularSearchResponse> => {
  const response = await get<BaseResponse<PopularSearchResponse>>(
    `${END_POINT.GET_POPULAR_SEARCH(limit)}`,
  );

  return response.data;
};

export const getRecentView = async (
  items: string,
): Promise<RecentPerformanceViewResponse> => {
  const response = await get<BaseResponse<RecentPerformanceViewResponse>>(
    `${END_POINT.GET_RECENT_VIEW(items)}`,
  );
  return response.data;
};
