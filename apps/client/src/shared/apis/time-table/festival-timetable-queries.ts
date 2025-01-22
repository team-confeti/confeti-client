import { queryOptions } from '@tanstack/react-query';
import { getFestivalTimetable } from './festival-timetable';

export const FESTIVAL_TIMETABLE_QUERY_KEY = {
  ALL: ['festivalTimetable'],
} as const;

export const FESTIVAL_TIMETABLE_QUERY_OPTIONS = {
  FESTIVAL_TIMETABLE: (festivalDateId: number) =>
    queryOptions({
      queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL, festivalDateId],
      queryFn: () => getFestivalTimetable(festivalDateId),
    }),
};
