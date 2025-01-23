import { queryOptions } from '@tanstack/react-query';
import { getFestivalTimetable } from './festival-timetable';

export const FESTIVAL_TIMETABLE_QUERY_KEY = {
  ALL: ['festivalTimetable'],
  DELETE_TIME_TABLE_FESTIVAL: (festivalId: number) => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    festivalId,
  ],
} as const;

export const FESTIVAL_TIMETABLE_QUERY_OPTIONS = {
  FESTIVAL_TIMETABLE: (festivalDateId: number) => {
    const options = queryOptions({
      queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL, festivalDateId],
      queryFn: () => getFestivalTimetable(festivalDateId),
    });
    return {
      ...options,
      enabled: !!festivalDateId,
    };
  },
};
