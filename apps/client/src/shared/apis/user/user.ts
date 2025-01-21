import { BaseResponse } from '@shared/types/api';
import { UserProfile } from '@shared/types/user-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '@shared/apis/config/instance';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await get<BaseResponse<UserProfile>>(
    END_POINT.GET_USER_PROFILE,
  );
  return response.data;
};
