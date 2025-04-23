import { queryOptions } from '@tanstack/react-query';

import { getMyTimeTablePreview } from './my-history';

export const MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_KEY = {
  ALL: ['time-table-preview'],
  MY_TIME_TABLE_PREVIEW: () => [
    ...MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_KEY.ALL,
    'time-table-preview',
  ],
} as const;

export const MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_OPTION = {
  ALL: () =>
    queryOptions({ queryKey: MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_KEY.ALL }),
  MY_TIME_TABLE_PREVIEW: () =>
    queryOptions({
      queryKey: MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_KEY.MY_TIME_TABLE_PREVIEW(),
      queryFn: getMyTimeTablePreview,
    }),
} as const;
