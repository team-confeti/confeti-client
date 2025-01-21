import { queryOptions } from '@tanstack/react-query';
import { getPerformances } from './performances';

export const PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
} as const;

export const PERFORMANCE_QUERY_OPTIONS = {
  ALL: () =>
    queryOptions({
      queryKey: PERFORMANCE_QUERY_KEY.ALL,
      queryFn: () => getPerformances(),
    }),
};
