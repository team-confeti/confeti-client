import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { SEARCH_ARTIST_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import {
  ArtistSearchResponse,
  RelatedArtistResponse,
} from '@shared/types/search-reponse';

export const SEARCH_ARTIST_QUERY_OPTIONS = {
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
