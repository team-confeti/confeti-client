import { queryOptions } from '@tanstack/react-query';

import {
  getLatestPerformances,
  getSuggestMusic,
  getSuggestPerformance,
  getTicketing,
} from './home';

export const HOME_QUERY_KEY = {
  ALL: ['home'],
  LATEST_PERFORMANCES: () => [...HOME_QUERY_KEY.ALL, 'latestPerformances'],
  TICKETING: () => [...HOME_QUERY_KEY.ALL, 'ticketing'],
  SUGGEST_PERFORMANCE: () => [...HOME_QUERY_KEY.ALL, 'suggestPerformance'],
  SUGGEST_MUSIC: () => [...HOME_QUERY_KEY.ALL, 'suggestMusic'],
} as const;

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
  SUGGEST_MUSIC: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.SUGGEST_MUSIC(),
      queryFn: getSuggestMusic,
    }),
};
