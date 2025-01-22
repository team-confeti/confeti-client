import { useSuspenseQuery } from '@tanstack/react-query';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/confeti-detail/performance-queries';

export const useConcertDetail = (concertId: number) => {
  const { data } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.CONCERT(concertId),
  );
  return data;
};
