import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  FavoriteArtistsResponses,
  PerformanceResponse,
  UserProfile,
} from '@shared/types/user-response';

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
    END_POINT.GET_FAVORITE_PERFORMANCES,
  );
  return response.data;
};
