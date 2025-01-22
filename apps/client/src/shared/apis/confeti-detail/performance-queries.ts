import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getConcertDetail, getFestivalDetail } from './confeti';
import { getFestivalToAdd } from './get-festival-to-add';

import { GetFestivalToAddResponse } from '@shared/types/get-festival-to-add-response';

export const PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
  CONCERT: (concertId: number) => [
    ...PERFORMANCE_QUERY_KEY.ALL,
    'concert',
    concertId,
  ],
  FESTIVAL: (festivalId: number) => [
    ...PERFORMANCE_QUERY_KEY.ALL,
    'festival',
    festivalId,
  ],
  GET_FESTIVAL_TO_ADD: {
    ALL: ['getFestivalToAdd'],
    LIST: () => [...PERFORMANCE_QUERY_KEY.GET_FESTIVAL_TO_ADD.ALL, 'list'],
  },
} as const;

export const PERFORMANCE_QUERY_OPTIONS = {
  CONCERT: (concertId: number) =>
    queryOptions({
      queryKey: PERFORMANCE_QUERY_KEY.CONCERT(concertId),
      queryFn: () => getConcertDetail(concertId),
    }),
  FESTIVAL: (festivalId: number) =>
    queryOptions({
      queryKey: PERFORMANCE_QUERY_KEY.FESTIVAL(festivalId),
      queryFn: () => getFestivalDetail(festivalId),
    }),
  GET_FESTIVAL_TO_ADD_LIST: () =>
    infiniteQueryOptions<GetFestivalToAddResponse, Error>({
      queryKey: PERFORMANCE_QUERY_KEY.GET_FESTIVAL_TO_ADD.LIST(),
      queryFn: ({ pageParam }) => getFestivalToAdd(pageParam as number),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }),
};
