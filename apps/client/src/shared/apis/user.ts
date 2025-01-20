import { BaseResponse } from '@shared/types/api';
import { UserProfile } from '@shared/types/user-response';
import { END_POINT } from '@shared/constants/api';
import { axiosInstance } from './instance';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<BaseResponse<UserProfile>>(
    END_POINT.GET_USER_PROFILE,
  );
  return response.data.data;
};
