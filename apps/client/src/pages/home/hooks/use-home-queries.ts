import { useSuspenseQueries } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';

export const useHomeQueries = () => {
  const PERFORMANCE_SIZE = 2;
  const SONG_SIZE = 3;

  const [
    userInfoResult,
    ticketingResult,
    latestPerformancesResult,
    suggestPerformanceResult,
    recommendPerformancesResult,
  ] = useSuspenseQueries({
    queries: [
      USER_QUERY_OPTIONS.PROFILE(),
      HOME_QUERY_OPTIONS.TICKETING(),
      HOME_QUERY_OPTIONS.LATEST_PERFORMANCES(),
      HOME_QUERY_OPTIONS.SUGGEST_PERFORMANCE(),
      HOME_QUERY_OPTIONS.RECOMMEND_PERFORMANCES(PERFORMANCE_SIZE, SONG_SIZE),
    ],
  });

  return {
    userName: userInfoResult.data?.name ?? null,
    ticketing: ticketingResult.data,
    latestPerformances: latestPerformancesResult.data,
    suggestPerformance: suggestPerformanceResult.data,
    recomendPerformances: recommendPerformancesResult.data,
  };
};
