import { useSuspenseQuery } from '@tanstack/react-query';
import { TICKETING_QUERY_OPTIONS } from '@shared/apis/carousel/ticketing-queries';

export const useTicketing = () => {
  const { data } = useSuspenseQuery(TICKETING_QUERY_OPTIONS.GET());
  return data;
};
