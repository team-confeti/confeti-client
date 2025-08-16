import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';
import { SortOption } from '@shared/constants/sort-label';
import {
  MyHistorySetList,
  MyHistorySetListResponse,
} from '@shared/types/my-history-response';

export const MY_SETLIST_QUERY_OPTION = {
  ALL: () =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.ALL,
    }),
  PREVIEW: () =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.PREVIEW(),
      queryFn: getMySetListPreview,
    }),
  OVERVIEW: (sortBy: SortOption, enabled: boolean = true) =>
    queryOptions({
      queryKey: SETLIST_QUERY_KEY.OVERVIEW(sortBy),
      queryFn: () => getMySetListOverView(sortBy),
      enabled,
    }),
};

export const getMySetListPreview = async () => {
  const response = await get<BaseResponse<MyHistorySetList[]>>(
    END_POINT.GET_MY_SET_LIST,
  );
  return response.data;
};

export const getMySetListOverView = async (sortBy: SortOption) => {
  const response = await get<BaseResponse<MyHistorySetListResponse>>(
    END_POINT.GET_MY_SET_LIST_OVERVIEW(sortBy),
  );
  return response.data;
};
