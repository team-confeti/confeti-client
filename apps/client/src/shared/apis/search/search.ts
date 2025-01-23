import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearch,
  GetPerformancesSearchResponse,
} from '@shared/types/search-reponse';
import { END_POINT } from '@shared/constants/api';
import { get } from '@shared/apis/config/instance';

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
  const url =
    cursor === 1
      ? `performances/association/${artistId}`
      : `performances/association/${artistId}?cursor=${cursor}`;

  const response = await get<BaseResponse<GetPerformancesSearchResponse>>(url);
  return response.data;
};
