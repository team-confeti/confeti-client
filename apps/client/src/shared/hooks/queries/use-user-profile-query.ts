import { useQuery } from '@tanstack/react-query';

import { getAccessToken } from '@confeti/core/auth';

import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';

export const useUserProfile = () => {
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.PROFILE(),
    enabled: !!getAccessToken(),
  });
  return { data };
};
