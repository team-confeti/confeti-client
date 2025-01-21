import { useSuspenseQuery } from '@tanstack/react-query';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/my-confeti';

export const usePerformanceDetail = () => {
  const { data } = useSuspenseQuery(PERFORMANCE_QUERY_OPTIONS.ALL());
  return data;
};
