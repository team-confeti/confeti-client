import { queryOptions } from '@tanstack/react-query';
import { getTicketing } from './ticketing';
import { getLatestPerformances } from './performances';

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
      queryFn: getLatestPerformances, // 새로운 API 호출 함수
    }),
};
