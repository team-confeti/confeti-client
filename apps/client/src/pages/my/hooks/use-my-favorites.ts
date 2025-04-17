import { useQuery } from '@tanstack/react-query';

import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { PerformancesFilterType } from '@shared/types/user-response';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

export const useMyArtistPreview = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.MY_ARTISTS_PREVIEW(),
    enabled: !isNotLoggedIn,
  });
  // 로딩 상태 제거
  return { data };
};

export const useMyPerformancePreview = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES_PREVIEW(),
    enabled: !isNotLoggedIn,
  });
  // 로딩 상태 제거
  return { data };
};

export const useMyPerformances = (performancesType: PerformancesFilterType) => {
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES(performancesType),
  });

  return { data };
};
