import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { MY_RECORD_QUERY_OPTION } from '@shared/apis/my-history/my-record-queries';
import { MY_SETLIST_QUERY_OPTION } from '@shared/apis/my-history/my-setlist-queries';
import { MY_TIMETABLE_QUERY_OPTION } from '@shared/apis/my-history/my-timetable-queries';
import { SortOption } from '@shared/constants/sort-label';

export const useMyTimeTablePreview = () => {
  const { data } = useSuspenseQuery(MY_TIMETABLE_QUERY_OPTION.PREVIEW());
  return { data };
};

export const useMyTimeTableOverView = (
  sortBy: SortOption,
  enabled: boolean,
) => {
  const { data } = useQuery(
    MY_TIMETABLE_QUERY_OPTION.OVERVIEW(sortBy, enabled),
  );
  return { data };
};

export const useMySetListPreview = () => {
  const { data } = useSuspenseQuery(MY_SETLIST_QUERY_OPTION.PREVIEW());
  return { data };
};

export const useMySetListOverView = (sortBy: SortOption, enabled: boolean) => {
  const { data } = useQuery(MY_SETLIST_QUERY_OPTION.OVERVIEW(sortBy, enabled));
  return { data };
};

export const useMyHistoryRecord = () => {
  const { data } = useSuspenseQuery(MY_RECORD_QUERY_OPTION.ALL());
  return { data };
};
