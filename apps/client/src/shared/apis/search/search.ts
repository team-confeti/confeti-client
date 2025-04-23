import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearchResponse,
  PerformancesSearchResponse,
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
