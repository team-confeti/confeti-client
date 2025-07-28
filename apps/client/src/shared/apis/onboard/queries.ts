import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import {
  onboardResponse,
  onboardStatusResponse,
} from '@shared/types/onboard-response';

import { get } from '../config/instance';

export const ONBOARD_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: ONBOARD_QUERY_KEY.ALL }),
  STATUS: () =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.STATUS(),
      queryFn: () => getOnboardStatus(),
    }),
  TOP_ARTIST: (limit: number) =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.TOP_ARTIST(limit),
      queryFn: () => getTopArtist(limit),
    }),
  ARTIST_RELATED_ARTIST: (artistId: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_ARTIST(artistId),
    queryFn: () => getArtistRelatedArtist(artistId, limit),
  }),
  ARTIST_RELATED_KEYWORDS: (keyword: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_KEYWORDS(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword, limit),
  }),
};

const getOnboardStatus = async (): Promise<onboardStatusResponse> => {
  const response = await get<BaseResponse<onboardStatusResponse>>(
    END_POINT.GET_ONBOARDING_STATUS,
  );
  return response.data;
};

const getTopArtist = async (limit: number): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_TOP100_ARTIST(limit),
  );
  return response.data;
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

const getArtistRelatedKeyword = async (
  keyword: string,
  limit: number,
): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_KEYWORDS(keyword, limit),
  );
  return response.data;
};
