import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get, patch } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { MY_TIMETABLE_MUTATION_KEY } from '@shared/constants/mutation-key';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { SortOption } from '@shared/constants/sort-label';
import { MyHistoryTimetableResponse } from '@shared/types/my-history-response';

interface DeleteTimetableRequest {
  deleteFestivalIds: number[];
}

export const MY_TIMETABLE_QUERY_OPTIONS = {
  ALL: () =>
    queryOptions({
      queryKey: MY_TIMETABLE_QUERY_KEY.ALL,
    }),
  PREVIEW: () =>
    queryOptions({
      queryKey: MY_TIMETABLE_QUERY_KEY.PREVIEW(),
      queryFn: getMyTimetablePreview,
    }),
  OVERVIEW: (sortBy: SortOption, enabled: boolean = true) =>
    queryOptions({
      queryKey: MY_TIMETABLE_QUERY_KEY.OVERVIEW(sortBy),
      queryFn: () => getMyTimetableOverView(sortBy),
      enabled,
    }),
  ORDER_BY: (orderBy: 'earliest' | 'latest') =>
    queryOptions({
      queryKey: [...MY_TIMETABLE_QUERY_KEY.ALL, orderBy],
      queryFn: () => getMyTimetableOrderBy(orderBy),
    }),
};

export const MY_TIMETABLE_MUTATION_OPTIONS = {
  DELETE_TIMETABLES: () =>
    mutationOptions({
      mutationKey: MY_TIMETABLE_MUTATION_KEY.DELETE_TIMETABLES(),
      mutationFn: (festivalIds: number[]) => deleteMyTimetables(festivalIds),
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

export const getMyTimetableOrderBy = async (orderBy: 'earliest' | 'latest') => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE_ORDER_BY(orderBy),
  );
  return response.data;
};

export const deleteMyTimetables = async (festivalIds: number[]) => {
  const body: DeleteTimetableRequest = {
    deleteFestivalIds: festivalIds,
  };

  const response = await patch<BaseResponse<null>>(
    END_POINT.DELETE_MY_TIMETABLES,
    body,
  );

  return response.data;
};
