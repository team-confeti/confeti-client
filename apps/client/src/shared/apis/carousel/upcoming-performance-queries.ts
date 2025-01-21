import { queryOptions } from '@tanstack/react-query';
import { getUpcomingPerformances } from './upcoming-performance';

export const UPCOMING_PERFORMANCES_QUERY_KEY = {
  ALL: ['upcomingPerformances'],
} as const;

export const UPCOMING_PERFORMANCES_QUERY_OPTIONS = {
  GET: () =>
    queryOptions({
      queryKey: UPCOMING_PERFORMANCES_QUERY_KEY.ALL,
      queryFn: getUpcomingPerformances,
    }),
};
