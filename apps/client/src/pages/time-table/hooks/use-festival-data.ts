import { useSuspenseQuery } from '@tanstack/react-query';

import { FESTIVAL_BUTTON_QUERY_OPTIONS } from '@shared/apis/time-table/festival-button-queries';
import {
  FESTIVAL_TIMETABLE_QUERY_OPTIONS,
  TIME_TABLE_CREATION_HISTORY_QUERY_OPTION,
} from '@shared/apis/time-table/festival-timetable-queries';

export const useFestivalButtonData = () => {
  const { data } = useSuspenseQuery(
    FESTIVAL_BUTTON_QUERY_OPTIONS.FESTIVAL_BUTTON(),
  );
  return data;
};

export const useFestivalTimetableData = (festivalDateId: number) => {
  const { data } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(festivalDateId),
  );
  return { data };
};

export const useTimeTableCreationHistory = () => {
  const { data } = useSuspenseQuery(
    TIME_TABLE_CREATION_HISTORY_QUERY_OPTION.TIME_TABLE_CREATION_HISTORY(),
  );
  return data;
};
