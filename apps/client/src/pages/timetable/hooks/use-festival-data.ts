import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';

export const useFestivalButtonData = () => {
  const { data } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.AVAILABLE_FESTIVALS(),
  );
  return data;
};

export const useFestivalTimetableData = (festivalDateId?: number) => {
  const options = FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(
    festivalDateId || 0,
  );
  const { data } = useQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    enabled: festivalDateId !== undefined,
  });

  return { data };
};

export const useTimetableCreationHistory = () => {
  const { data } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ONBOARDING(),
  );
  return data;
};
