import { useSuspenseQuery } from '@tanstack/react-query';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/time-table/festival-timetable-queries';

export const useFestivalTimetables = () => {
  const { data } = useSuspenseQuery(FESTIVAL_TIMETABLE_QUERY_OPTIONS.GET());
  return data;
};
