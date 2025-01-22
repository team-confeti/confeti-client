import { queryOptions } from '@tanstack/react-query';
import { getTicketing } from './ticketing';

export const CAROUSEL_QUERY_KEY = {
  ALL: ['carousel'],
  TICKETING: ['carousel', 'ticketing'],
} as const;

export const CAROUSEL_QUERY_OPTIONS = {
  TICKETING: () =>
    queryOptions({
      queryKey: CAROUSEL_QUERY_KEY.TICKETING,
      queryFn: getTicketing,
    }),
};
