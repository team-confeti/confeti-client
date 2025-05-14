import { useEffect } from 'react';
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';

import { HOME_QUERY_OPTIONS } from '@shared/apis/home/home-queries';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';

export const useHomeQueries = () => {
  const [
    userInfoResult,
    ticketingResult,
    latestPerformancesResult,
    suggestPerformanceResult,
    suggestMusicPerformanceResult,
  ] = useSuspenseQueries({
    queries: [
      USER_QUERY_OPTIONS.PROFILE(),
      HOME_QUERY_OPTIONS.TICKETING(),
      HOME_QUERY_OPTIONS.LATEST_PERFORMANCES(),
      HOME_QUERY_OPTIONS.SUGGEST_PERFORMANCE(),
      HOME_QUERY_OPTIONS.SUGGEST_MUSIC_PERFORMANCE(),
    ],
  });

  return {
    userName: userInfoResult.data?.name ?? null,
    ticketing: ticketingResult.data,
    latestPerformances: latestPerformancesResult.data,
    suggestPerformance: suggestPerformanceResult.data,
    suggestMusicPerformance: suggestMusicPerformanceResult.data,
  };
};

export const useSuggestMusic = (performanceId: number, musicIds?: string[]) => {
  const { data, refetch, isLoading } = useQuery({
    ...HOME_QUERY_OPTIONS.SUGGEST_MUSIC(performanceId, musicIds),
  });

  return { data, refetch, isLoading };
};
