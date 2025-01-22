import { useSuspenseQuery } from '@tanstack/react-query';
import { FESTIVAL_BUTTON_QUERY_OPTIONS } from '@shared/apis/time-table/festival-button-queries';

export const useFestivalTimetables = () => {
  const { data } = useSuspenseQuery(FESTIVAL_BUTTON_QUERY_OPTIONS.GET());
  return data;
};
