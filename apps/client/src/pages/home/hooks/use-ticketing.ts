import { useSuspenseQuery } from '@tanstack/react-query';

import { CAROUSEL_QUERY_OPTIONS } from '@shared/apis/carousel/carousel-queries';

export const useTicketing = () => {
  const { data } = useSuspenseQuery(CAROUSEL_QUERY_OPTIONS.TICKETING());
  return data;
};
