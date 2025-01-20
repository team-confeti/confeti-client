import { queryOptions } from '@tanstack/react-query';
import { getConcertDetail } from './concert';
import { getFestivalDetail } from './festival';

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
};
