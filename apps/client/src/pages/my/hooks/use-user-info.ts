import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

export const useUserProfile = () => {
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.PROFILE(),
    enabled: !checkIsNotLoggedIn(),
  });
  return { data };
};
