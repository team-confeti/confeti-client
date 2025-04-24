import { queryOptions } from '@tanstack/react-query';

import { SortOption } from '@shared/constants/sort-label';

import { getMyTimeTableOverView, getMyTimeTablePreview } from './my-history';

export const MY_HISTORY_TIME_TABLE_QUERY_KEY = {
  ALL: ['my-history-timetable'],
  MY_TIME_TABLE_PREVIEW: () => [
    ...MY_HISTORY_TIME_TABLE_QUERY_KEY.ALL,
    'preview',
  ],
  MY_TIME_TABLE_OVERVIEW: (sortBy: SortOption) => [
    ...MY_HISTORY_TIME_TABLE_QUERY_KEY.ALL,
    'overview',
    sortBy,
  ],
} as const;

export const MY_HISTORY_TIME_TABLE_QUERY_OPTION = {
  ALL: () => queryOptions({ queryKey: MY_HISTORY_TIME_TABLE_QUERY_KEY.ALL }),
  PREVIEW: () =>
    queryOptions({
      queryKey: MY_HISTORY_TIME_TABLE_QUERY_KEY.MY_TIME_TABLE_PREVIEW(),
      queryFn: getMyTimeTablePreview,
    }),
  OVERVIEW: (sortBy: SortOption) => ({
    queryKey: MY_HISTORY_TIME_TABLE_QUERY_KEY.MY_TIME_TABLE_OVERVIEW(sortBy),
    queryFn: () => getMyTimeTableOverView(sortBy),
  }),
} as const;
