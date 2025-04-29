import { queryOptions } from '@tanstack/react-query';

import { SetListPerformanceRequest } from '@shared/types/my-history-response';

import { getSetListPerformance } from './setlist';

export const SETLIST_QUERY_KEY = {
  ALL: ['setlist'],
  SEARCH_PERFORMANCE: (request: SetListPerformanceRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'performance',
    request,
  ],
};

export const SETLIST_QUERY_OPTION = {
  ALL: () =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.ALL,
    }),
  SEARCH_PERFORMANCE: (request: SetListPerformanceRequest, enabled: boolean) =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.SEARCH_PERFORMANCE(request),
      queryFn: () => getSetListPerformance(request),
      enabled,
    }),
};
