import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearchResponse,
  IntendedPerformanceRequest,
  IntendedPerformanceResponse,
  PerformancesSearchResponse,
  PerformanceTypeAnalysis,
  RelatedArtistResponse,
  RelatedPerformanceResponse,
} from '@shared/types/search-reponse';

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

export const getArtistRelatedPerformances = async (
  artistId: string | null,
): Promise<PerformancesSearchResponse> => {
  const response = await get<BaseResponse<PerformancesSearchResponse>>(
    `${END_POINT.GET_PERFORMANCES_SEARCH(artistId)}`,
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
