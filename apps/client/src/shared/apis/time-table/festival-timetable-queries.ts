import { queryOptions } from '@tanstack/react-query';
import { getFestivalTimetables } from './festival-timetable';

export const FESTIVAL_TIMETABLE_QUERY_KEY = {
  ALL: ['festivalTimetables'],
  DELETE_TIME_TABLE_FESTIVAL: (festivalId: number) => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    festivalId,
  ],
} as const;

export const FESTIVAL_TIMETABLE_QUERY_OPTIONS = {
  GET: () =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
      queryFn: getFestivalTimetables,
    }),
};
