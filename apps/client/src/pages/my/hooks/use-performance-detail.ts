import { useSuspenseQuery } from '@tanstack/react-query';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';

export const useUserPerformanceMore = (concertId: number) => {
  const { data } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.CONCERT(concertId),
  );
  return data;
};
