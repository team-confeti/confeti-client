import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/confeti-detail/performance-queries';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useUserPerformanceMore = (concertId: number) => {
  const { data } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.CONCERT(concertId),
  );
  return data;
};
