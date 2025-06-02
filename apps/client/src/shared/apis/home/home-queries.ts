import { queryOptions } from '@tanstack/react-query';

import { HOME_QUERY_KEY } from '@shared/constants/query-key';

import {
  getLatestPerformances,
  getSuggestMusic,
  getSuggestMusicPerformance,
  getSuggestPerformance,
  getTicketing,
} from './home';

export const HOME_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: HOME_QUERY_KEY.ALL }),
  LATEST_PERFORMANCES: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.LATEST_PERFORMANCES(),
      queryFn: getLatestPerformances,
    }),
  TICKETING: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.TICKETING(),
      queryFn: getTicketing,
    }),
  SUGGEST_PERFORMANCE: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.SUGGEST_PERFORMANCE(),
      queryFn: getSuggestPerformance,
    }),
  SUGGEST_MUSIC_PERFORMANCE: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.SUGGEST_MUSIC_PERFORMANCE(),
      queryFn: getSuggestMusicPerformance,
    }),
  SUGGEST_MUSIC: (performanceId: number, musicIds?: string[]) =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.SUGGEST_MUSIC(performanceId, musicIds),
      queryFn: () => getSuggestMusic(performanceId, musicIds),
    }),
};
