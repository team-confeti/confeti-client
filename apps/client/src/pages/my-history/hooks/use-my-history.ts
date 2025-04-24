import { useSuspenseQuery } from '@tanstack/react-query';

import { MY_HISTORY_TIME_TABLE_QUERY_OPTION } from '@shared/apis/my-history/my-history-queries';
import { SortOption } from '@shared/constants/sort-label';

export const useMyTimeTablePreview = () => {
  const { data } = useSuspenseQuery(
    MY_HISTORY_TIME_TABLE_QUERY_OPTION.PREVIEW(),
  );
  return { data };
};

export const useMyTimeTableOverView = (sortBy: SortOption) => {
  const { data } = useSuspenseQuery(
    MY_HISTORY_TIME_TABLE_QUERY_OPTION.OVERVIEW(sortBy),
  );
  return { data };
};
