import { useSuspenseQuery } from '@tanstack/react-query';

import { USER_QUERY_OPTIONS } from '@shared/apis/user-queries';

export const useUserProfile = () => {
  const { data } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());
  return data;
};
