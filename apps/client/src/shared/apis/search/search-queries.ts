import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { SEARCH_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearchResponse,
  RelatedArtistResponse,
  RelatedPerformanceResponse,
  SearchAllResponse,
} from '@shared/types/search-response';

export const SEARCH_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: SEARCH_QUERY_KEY.ALL }),
  SEARCH_RELATED_ARTISTS: (keyword: string, limit: number, enabled: boolean) =>
    queryOptions({
      queryKey: SEARCH_QUERY_KEY.SEARCH_ARTIST(keyword),
      queryFn: () => getArtistRelatedKeyword(keyword, limit),
      enabled,
    }),
  SEARCH_RELATED_PERFORMANCES: (
    keyword: string,
    limit: number,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey: SEARCH_QUERY_KEY.SEARCH_PERFORMANCES(keyword),
      queryFn: () => getPerformanceRelatedKeyword(keyword, limit),
      enabled,
    }),
  SEARCH_ALL: (
    aid: string | null,
    pid: string | null,
    term: string | null,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey: SEARCH_QUERY_KEY.SEARCH_ALL(aid, pid, term),
      queryFn: () => getSearchAll(aid, pid, term),
      enabled,
    }),
};

export const getSearchAll = async (
  aid: string | null,
  pid: string | null,
  term: string | null,
): Promise<SearchAllResponse> => {
  const response = await get<BaseResponse<SearchAllResponse>>(
    `${END_POINT.GET_SEARCH_ALL}`,
    {
      params: {
        aid,
        pid,
        term: term ? encodeURIComponent(term) : null,
      },
    },
  );
  return response.data;
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
  limit: number,
): Promise<RelatedArtistResponse> => {
  const response = await get<BaseResponse<RelatedArtistResponse>>(
    `${END_POINT.GET_ARTISTS_SEARCH_RELATED_KEYWORD(keyword, limit)}`,
  );
  return response.data;
};

export const getPerformanceRelatedKeyword = async (
  keyword: string,
  limit: number,
): Promise<RelatedPerformanceResponse> => {
  const response = await get<BaseResponse<RelatedPerformanceResponse>>(
    `${END_POINT.GET_PERFORMANCES_SEARCH_RELATED_KEYWORD(keyword, limit)}`,
  );
  return response.data;
};
