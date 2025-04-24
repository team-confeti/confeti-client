import { queryOptions } from '@tanstack/react-query';

import { SortOption } from '@shared/constants/sort-label';

import {
  getMySetListOverView,
  getMySetListPreview,
  getMyTimeTableOverView,
  getMyTimeTablePreview,
} from './my-history';

export const MY_HISTORY_QUERY_KEY = {
  ALL: ['my-history'],
  TIME_TABLE: {
    ALL: () => [...MY_HISTORY_QUERY_KEY.ALL, 'time-table'],
    PREVIEW: () => [...MY_HISTORY_QUERY_KEY.ALL, 'time-table', 'preview'],
    OVERVIEW: (sortBy: SortOption) => [
      ...MY_HISTORY_QUERY_KEY.ALL,
      'time-table',
      'overview',
      sortBy,
    ],
  },
  SETLIST: {
    ALL: () => [...MY_HISTORY_QUERY_KEY.ALL, 'setlist'],
    PREVIEW: () => [...MY_HISTORY_QUERY_KEY.ALL, 'setlist', 'preview'],
    OVERVIEW: (sortBy: SortOption) => [
      ...MY_HISTORY_QUERY_KEY.ALL,
      'setlist',
      'overview',
      sortBy,
    ],
  },
} as const;

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
    OVERVIEW: (sortBy: SortOption) =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.TIME_TABLE.OVERVIEW(sortBy),
        queryFn: () => getMyTimeTableOverView(sortBy),
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
    OVERVIEW: (sortBy: SortOption) =>
      queryOptions({
        queryKey: MY_HISTORY_QUERY_KEY.SETLIST.OVERVIEW(sortBy),
        queryFn: () => getMySetListOverView(sortBy),
      }),
  },
} as const;
