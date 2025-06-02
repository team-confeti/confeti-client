import { queryOptions } from '@tanstack/react-query';

import {
  FESTIVAL_TIMETABLE_QUERY_KEY,
  TIME_TABLE_CREATION_HISTORY_QUERY_KEY,
} from '@shared/constants/query-key';

import {
  getFestivalTimetable,
  getTimeTableCreationHistory,
} from './festival-timetable';

export const FESTIVAL_TIMETABLE_QUERY_OPTIONS = {
  FESTIVAL_TIMETABLE: (festivalId: number) =>
    queryOptions({
      queryKey:
        FESTIVAL_TIMETABLE_QUERY_KEY.DELETE_TIME_TABLE_FESTIVAL(festivalId),
      queryFn: () => getFestivalTimetable(festivalId),
    }),
};

export const TIMETABLE_ONBOARDING_QUERY_KEY = {
  TIME_TABLE_CREATION_HISTORY: () =>
    queryOptions({
      queryKey: TIME_TABLE_CREATION_HISTORY_QUERY_KEY.ALL,
      queryFn: getTimeTableCreationHistory,
    }),
};
