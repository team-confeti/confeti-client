import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { FESTIVAL_BUTTON_QUERY_OPTIONS } from '@shared/apis/time-table/festival-button-queries';
import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/time-table/festival-timetable-queries';

export const useFestivalButtonData = () => {
  const { data } = useSuspenseQuery(
    FESTIVAL_BUTTON_QUERY_OPTIONS.FESTIVAL_BUTTON(),
  );
  return data;
};

export const useFestivalTimetableData = (festivalDateId: number) => {
  const queryOptions =
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(festivalDateId);

  const { data } = useQuery(queryOptions);

  return { data };
};
