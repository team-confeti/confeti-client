import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearch,
  GetPerformancesSearchResponse,
} from '@shared/types/search-reponse';

export const getArtistSearch = async (
  keyword: string,
): Promise<ArtistSearch> => {
  const response = await get<BaseResponse<ArtistSearch>>(
    `${END_POINT.GET_ARTISTS_SEARCH}${encodeURIComponent(keyword)}`,
  );
  return response.data;
};

export const getPerformancesSearch = async (
  artistId: string,
  cursor: number,
): Promise<GetPerformancesSearchResponse> => {
  const baseUrl = `performances/association/${artistId}`;
  const url = cursor === 1 ? baseUrl : `${baseUrl}?cursor=${cursor}`;

  const response = await get<BaseResponse<GetPerformancesSearchResponse>>(url);
  return response.data;
};
