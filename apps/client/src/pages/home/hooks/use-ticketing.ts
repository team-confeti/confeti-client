import { CAROUSEL_QUERY_OPTIONS } from '@shared/apis/carousel/carousel-queries';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useTicketing = () => {
  const { data } = useSuspenseQuery(CAROUSEL_QUERY_OPTIONS.TICKETING());
  return data;
};
