import { useSuspenseQuery } from '@tanstack/react-query';

import { MY_HISTORY_QUERY_OPTION } from '@shared/apis/my-history/my-history-queries';
import { SortOption } from '@shared/constants/sort-label';

export const useMyTimeTablePreview = () => {
  const { data } = useSuspenseQuery(
    MY_HISTORY_QUERY_OPTION.TIME_TABLE.PREVIEW(),
  );
  return { data };
};

export const useMyTimeTableOverView = (sortBy: SortOption) => {
  const { data } = useSuspenseQuery(
    MY_HISTORY_QUERY_OPTION.TIME_TABLE.OVERVIEW(sortBy),
  );
  return { data };
};

export const useMySetListPreview = () => {
  const { data } = useSuspenseQuery(MY_HISTORY_QUERY_OPTION.SETLIST.PREVIEW());
  return { data };
};

export const useMySetListOverView = (sortBy: SortOption) => {
  const { data } = useSuspenseQuery(
    MY_HISTORY_QUERY_OPTION.SETLIST.OVERVIEW(sortBy),
  );
  return { data };
};
