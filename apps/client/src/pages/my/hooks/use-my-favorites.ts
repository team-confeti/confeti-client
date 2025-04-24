import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { SortOption } from '@shared/constants/sort-label';
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

export const useMyUpcomingPerformance = () => {
  const isNotLoggedIn = checkIsNotLoggedIn();
  const { data } = useQuery({
    ...USER_QUERY_OPTIONS.MY_UPCOMING_PERFORMANCE(),
    enabled: !isNotLoggedIn,
  });
  return { data };
};

export const useMyArtist = (sortBy: SortOption) => {
  const { data } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_ARTISTS(sortBy),
  });
  return { data };
};

export const useMyPerformances = (performancesType: PerformancesFilterType) => {
  const { data } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES(performancesType),
  });
  return { data };
};
