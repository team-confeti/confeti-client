import { useSuspenseQuery } from '@tanstack/react-query';
import { UPCOMING_PERFORMANCES_QUERY_OPTIONS } from '@shared/apis/carousel/upcoming-performance-queries';

export const useUpcomingPerformances = () => {
  const { data } = useSuspenseQuery(UPCOMING_PERFORMANCES_QUERY_OPTIONS.GET());
  return data;
};
