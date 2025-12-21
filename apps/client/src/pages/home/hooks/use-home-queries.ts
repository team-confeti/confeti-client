import { useSuspenseQueries } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';

export const useHomeQueries = () => {
  const [
    userInfoResult,
    ticketingResult,
    latestPerformancesResult,
    suggestPerformanceResult,
  ] = useSuspenseQueries({
    queries: [
      USER_QUERY_OPTIONS.PROFILE(),
      HOME_QUERY_OPTIONS.TICKETING(),
      HOME_QUERY_OPTIONS.LATEST_PERFORMANCES(),
      HOME_QUERY_OPTIONS.SUGGEST_PERFORMANCE(),
    ],
  });

  return {
    userName: userInfoResult.data?.name ?? null,
    ticketing: ticketingResult.data,
    latestPerformances: latestPerformancesResult.data,
    suggestPerformance: suggestPerformanceResult.data,
  };
};
