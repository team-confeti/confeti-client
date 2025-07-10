import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { CACHE_TIME, END_POINT } from '@shared/constants/api';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { SortOption } from '@shared/constants/sort-label';
import { MyHistoryTimetableResponse } from '@shared/types/my-history-response';

export const MY_TIMETABLE_QUERY_OPTION = {
  ALL: () =>
    queryOptions({
      queryKey: MY_TIMETABLE_QUERY_KEY.ALL,
    }),
  PREVIEW: () =>
    queryOptions({
      queryKey: MY_TIMETABLE_QUERY_KEY.PREVIEW(),
      queryFn: getMyTimetablePreview,
      staleTime: CACHE_TIME.SHORT,
    }),
  OVERVIEW: (sortBy: SortOption, enabled: boolean = true) =>
    queryOptions({
      queryKey: MY_TIMETABLE_QUERY_KEY.OVERVIEW(sortBy),
      queryFn: () => getMyTimetableOverView(sortBy),
      enabled,
    }),
};

export const getMyTimetablePreview = async () => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE,
  );
  return response.data;
};

export const getMyTimetableOverView = async (sortBy: SortOption) => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE_OVERVIEW(sortBy),
  );
  return response.data;
};
