import { queryOptions } from '@tanstack/react-query';

import { getAccessToken } from '@confeti/core/auth';
import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { CACHE_TIME, END_POINT } from '@shared/constants/api';
import { USER_QUERY_KEY } from '@shared/constants/query-key';
import { SortOption } from '@shared/constants/sort-label';
import {
  FavoriteArtistsResponses,
  MyArtistsResponse,
  MyPerformancesResponse,
  PerformanceResponse,
  PerformancesFilterType,
  UserProfile,
} from '@shared/types/user-response';

export const USER_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: USER_QUERY_KEY.ALL }),
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
      staleTime: CACHE_TIME.LONG,
    }),
  MY_ARTISTS_PREVIEW: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.MY_ARTISTS(),
      queryFn: getMyArtistsPreview,
    }),
  MY_PERFORMANCES_PREVIEW: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.MY_PERFORMANCES(),
      queryFn: getMyPerformancesPreview,
    }),
  MY_ARTISTS: (sortBy: SortOption) =>
    queryOptions({
      queryKey: [USER_QUERY_KEY.MY_ARTISTS(), sortBy],
      queryFn: () => getMyArtists(sortBy),
    }),
  MY_PERFORMANCES: (performancesType: PerformancesFilterType) =>
    queryOptions({
      queryKey: [USER_QUERY_KEY.MY_PERFORMANCES(), performancesType],
      queryFn: () => getMyPerformances(performancesType),
    }),
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  if (!getAccessToken()) return null;
  const response = await get<BaseResponse<UserProfile>>(
    END_POINT.GET_USER_PROFILE,
  );
  return response.data;
};

export const getMyArtistsPreview =
  async (): Promise<FavoriteArtistsResponses> => {
    const response = await get<BaseResponse<FavoriteArtistsResponses>>(
      END_POINT.GET_MY_ARTISTS_PREVIEW,
    );
    return response.data;
  };

export const getMyPerformancesPreview =
  async (): Promise<PerformanceResponse> => {
    const response = await get<BaseResponse<PerformanceResponse>>(
      END_POINT.GET_MY_PERFORMANCES_PREVIEW,
    );
    return response.data;
  };

export const getMyArtists = async (
  sortBy: SortOption,
): Promise<MyArtistsResponse> => {
  const response = await get<BaseResponse<MyArtistsResponse>>(
    END_POINT.GET_MY_ARTISTS(sortBy),
  );
  return response.data;
};

export const getMyPerformances = async (
  performancesType: PerformancesFilterType,
): Promise<MyPerformancesResponse> => {
  const response = await get<BaseResponse<MyPerformancesResponse>>(
    END_POINT.GET_MY_PERFORMANCES(performancesType),
  );
  return response.data;
};
