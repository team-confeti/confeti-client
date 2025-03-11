import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.PROFILE(),
    enabled: !isNotLoggedIn,
  });
  return { data };
};
