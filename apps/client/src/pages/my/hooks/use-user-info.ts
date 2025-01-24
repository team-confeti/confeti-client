import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { USER_ID_KEY } from '@shared/constants/user-constants';

export const useUserProfile = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  const { data, isLoading } = useQuery({
    ...USER_QUERY_OPTIONS.PROFILE(),
    enabled: !!userId,
  });
  return { data, isLoading };
};
