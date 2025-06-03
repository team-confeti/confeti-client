import { queryOptions } from '@tanstack/react-query';

import { get, patch } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { USER_QUERY_KEY } from '@shared/constants/query-key';
import { SortOption } from '@shared/constants/sort-label';
import { BaseResponse } from '@shared/types/api';
import {
  FavoriteArtistsResponses,
  MyArtistsResponse,
  MyPerformancesResponse,
  MyUpcomingPerformance,
  PerformanceResponse,
  PerformancesFilterType,
  UserInfo,
  UserProfile,
} from '@shared/types/user-response';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

export const USER_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: USER_QUERY_KEY.ALL }),
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
      staleTime: 3 * 60 * 1000,
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
  MY_UPCOMING_PERFORMANCE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.MY_UPCOMING_PERFORMANCE(),
      queryFn: getMyUpcomingPerformance,
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
  if (checkIsNotLoggedIn()) return null;
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

export const getMyUpcomingPerformance =
  async (): Promise<MyUpcomingPerformance> => {
    const response = await get<BaseResponse<MyUpcomingPerformance>>(
      END_POINT.GET_MY_UPCOMING_PERFORMANCE,
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

export const patchUserInfo = async (userInfo: UserInfo): Promise<UserInfo> => {
  const formData = new FormData();
  formData.append('name', userInfo.name);

  if (userInfo.profileFile) {
    formData.append('profileFile', userInfo.profileFile);
  } else {
    const emptyFile = new Blob([], { type: 'image/jpeg' });
    formData.append('profileFile', emptyFile, 'empty.jpg');
  }

  const response = await patch<BaseResponse<UserInfo>>(
    END_POINT.PATCH_USER_INFO,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
