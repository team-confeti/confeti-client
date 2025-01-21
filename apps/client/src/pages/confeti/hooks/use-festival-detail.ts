import { useSuspenseQuery } from '@tanstack/react-query';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/confeti-detail/performance-queries';

export const useFestivalDetail = (festivalId: number) => {
  const { data } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.FESTIVAL(festivalId),
  );
  return data;
};
