import { instance } from '@shared/apis/api';
import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from './queries';
import { UserProfile } from '../types/user-response';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await instance.get<BaseResponse<UserProfile>>(
    END_POINT.GET_USER_PROFILE,
  );
  return response.data.data;
};

export const useUserProfile = () => {
  const { data } = useSuspenseQuery({
    queryKey: USER_QUERY_OPTIONS.ALL().queryKey,
    queryFn: USER_QUERY_OPTIONS.ALL().queryFn,
  });

  return data;
};
