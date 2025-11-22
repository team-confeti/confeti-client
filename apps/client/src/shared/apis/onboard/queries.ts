import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { ONBOARD_MUTATION_KEY } from '@shared/constants/mutation-key';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import {
  onboardResponse,
  onboardStatusResponse,
} from '@shared/types/onboard-response';

import { get, post } from '../config/instance';

export const ONBOARD_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: ONBOARD_QUERY_KEY.ALL }),
  STATUS: () =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.STATUS(),
      queryFn: () => getOnboardStatus(),
    }),
  TOP_ARTIST: (limit: number, artistId: string | null) =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.TOP_ARTIST(limit, artistId),
      queryFn: () => getTopArtist(limit, artistId),
    }),
  ARTIST_RELATED_KEYWORDS: (keyword: string, limit: number) => ({
    queryKey: ONBOARD_QUERY_KEY.ARTIST_RELATED_KEYWORDS(keyword),
    queryFn: () => getArtistRelatedKeyword(keyword, limit),
  }),
  SELECTED_ARTIST: () => ({
    queryKey: ONBOARD_QUERY_KEY.SELECTED_ARTIST(),
    queryFn: () => getSelectedArtist(),
  }),
};

export const ONBOARD_MUTATION_OPTIONS = {
  AUTH_ONBOARD: () => ({
    mutationKey: ONBOARD_MUTATION_KEY.AUTH_ONBOARD(),
    mutationFn: (favoriteArtists: string[]) =>
      postAuthOnboarding(favoriteArtists),
  }),
};

const getOnboardStatus = async (): Promise<onboardStatusResponse> => {
  const response = await get<BaseResponse<onboardStatusResponse>>(
    END_POINT.GET_ONBOARDING_STATUS,
  );
  return response.data;
};

const getTopArtist = async (
  limit: number,
  artistId: string | null,
): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST(limit, artistId),
  );
  return response.data;
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

export const getSelectedArtist = async (): Promise<
  BaseResponse<onboardResponse>
> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_SELECTED_ARTIST,
  );
  return response;
};

export const postAuthOnboarding = async (
  favoriteArtists: string[],
): Promise<void> => {
  const requestBody = {
    favoriteArtists: favoriteArtists.map((id) => ({ artistId: id })),
  };
  await post<BaseResponse<null>>(END_POINT.POST_AUTH_ONBOARD, requestBody);
};
