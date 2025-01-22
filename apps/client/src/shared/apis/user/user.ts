import { BaseResponse } from '@shared/types/api';
import {
  UserProfile,
  FavoriteArtistsResponses,
  PerformanceResponse,
} from '@shared/types/user-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '@shared/apis/config/instance';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await get<BaseResponse<UserProfile>>(
    END_POINT.GET_USER_PROFILE,
  );
  return response.data;
};

export const getMyArtists = async (): Promise<FavoriteArtistsResponses> => {
  const response = await get<BaseResponse<FavoriteArtistsResponses>>(
    END_POINT.GET_FAVORITE_ARTISTS,
  );
  return response.data;
};

export const getPerformances = async (): Promise<PerformanceResponse> => {
  const response = await get<BaseResponse<PerformanceResponse>>(
    END_POINT.GET_PERFORMANCE_FAVORITE,
  );
  return response.data;
};
