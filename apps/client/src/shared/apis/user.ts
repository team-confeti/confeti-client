import { BaseResponse } from '@shared/types/api';
import { UserProfile } from '@shared/types/user-response';
import { END_POINT } from '@shared/constants/api';
import { instance } from './api';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await instance.get<BaseResponse<UserProfile>>(
    END_POINT.GET_USER_PROFILE,
  );
  return response.data.data;
};
