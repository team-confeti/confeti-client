import { queryOptions } from '@tanstack/react-query';

import { MY_HISTORY_QUERY_KEY } from '@shared/constants/query-key';
import { SortOption } from '@shared/constants/sort-label';

import {
  getMyHistoryRecord,
  getMySetListOverView,
  getMySetListPreview,
  getMyTimeTableOverView,
  getMyTimeTablePreview,
} from './my-history';

export const MY_HISTORY_QUERY_OPTION = {
  TIME_TABLE: {
    ALL: () =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.TIME_TABLE.ALL(),
      }),
    PREVIEW: () =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.TIME_TABLE.PREVIEW(),
        queryFn: getMyTimeTablePreview,
      }),
    OVERVIEW: (sortBy: SortOption, enabled: boolean = true) =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.TIME_TABLE.OVERVIEW(sortBy),
        queryFn: () => getMyTimeTableOverView(sortBy),
        enabled,
      }),
  },
  SETLIST: {
    ALL: () =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.SETLIST.ALL(),
      }),
    PREVIEW: () =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.SETLIST.PREVIEW(),
        queryFn: getMySetListPreview,
      }),
    OVERVIEW: (sortBy: SortOption, enabled: boolean = true) =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.SETLIST.OVERVIEW(sortBy),
        queryFn: () => getMySetListOverView(sortBy),
        enabled,
      }),
  },
  RECORD: {
    ALL: () =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.RECORD.ALL(),
        queryFn: getMyHistoryRecord,
      }),
  },
} as const;
