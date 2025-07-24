import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

export const ARTIST_RELATED_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: ONBOARD_QUERY_KEY.ALL }),
  ARTIST: (artistId: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_ARTIST(artistId),
    queryFn: () => getArtistRelatedArtist(artistId, limit),
  }),

  KEYWORD: (keyword: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_KEYWORDS(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword, limit),
  }),
};

export const getArtistRelatedArtist = async (
  artistId: string,
  limit: number,
): Promise<BaseResponse<onboardResponse>> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_ARTIST(artistId, limit),
  );
  return response;
};

export const getArtistRelatedKeyword = async (
  keyword: string,
  limit: number,
): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_KEYWORDS(keyword, limit),
  );
  return response.data;
};
