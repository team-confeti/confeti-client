import { useSuspenseQuery } from '@tanstack/react-query';

import { CAROUSEL_QUERY_OPTIONS } from '@shared/apis/carousel/carousel-queries';

export const useLatestPerformances = () => {
  const { data } = useSuspenseQuery(
    CAROUSEL_QUERY_OPTIONS.LATEST_PERFORMANCES(),
  );

  return {
    latestPerformances: data.performances || [],
  };
};
