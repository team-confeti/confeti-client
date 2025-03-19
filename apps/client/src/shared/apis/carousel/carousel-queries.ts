import { queryOptions } from '@tanstack/react-query';

import { getLatestPerformances } from './performances';
import { getTicketing } from './ticketing';

export const CAROUSEL_QUERY_KEY = {
  ALL: ['carousel'],
  TICKETING: ['carousel', 'ticketing'],
  LATEST_PERFORMANCES: ['carousel', 'latestPerformances'],
} as const;

export const CAROUSEL_QUERY_OPTIONS = {
  TICKETING: () =>
    queryOptions({
      queryKey: CAROUSEL_QUERY_KEY.TICKETING,
      queryFn: getTicketing,
    }),

  LATEST_PERFORMANCES: () =>
    queryOptions({
      queryKey: CAROUSEL_QUERY_KEY.LATEST_PERFORMANCES,
      queryFn: getLatestPerformances,
    }),
};
