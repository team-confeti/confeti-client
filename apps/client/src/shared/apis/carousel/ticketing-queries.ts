import { queryOptions } from '@tanstack/react-query';
import { getTicketing } from './ticketing';

export const TICKETING_QUERY_KEY = {
  ALL: ['ticketing'],
} as const;

export const TICKETING_QUERY_OPTIONS = {
  GET: () =>
    queryOptions({
      queryKey: TICKETING_QUERY_KEY.ALL,
      queryFn: getTicketing,
    }),
};
