import { useSuspenseQuery } from '@tanstack/react-query';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/confeti-detail/performance-queries';
import { Festival, FestivalDate } from '@shared/types/festival-response';

interface UseFestivalDetailReturn {
  festival: Festival;
  festivalDates: FestivalDate[];
}

export const useFestivalDetail = (
  festivalId: number,
): UseFestivalDetailReturn => {
  const { data } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.FESTIVAL(festivalId),
  );
  return {
    festival: data.festival,
    festivalDates: data.festivalDates,
  };
};
