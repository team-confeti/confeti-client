import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get, patch } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { MY_TIMETABLE_MUTATION_KEY } from '@shared/constants/mutation-key';
import { MY_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { MyHistoryTimetableResponse } from '@shared/types/my-history-response';

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
  SORT_BY: (sortBy: 'earliest' | 'latest') =>
    queryOptions({
      queryKey: [...MY_TIMETABLE_QUERY_KEY.ALL, sortBy],
      queryFn: () => getMyTimetableSortBy(sortBy),
    }),
};

export const MY_TIMETABLE_MUTATION_OPTIONS = {
  DELETE_TIMETABLES: () =>
    mutationOptions({
      mutationKey: MY_TIMETABLE_MUTATION_KEY.DELETE_TIMETABLES(),
      mutationFn: (timetableIds: number[]) => deleteMyTimetables(timetableIds),
    }),
};

export const getMyTimetablePreview = async () => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE,
  );
  return response.data;
};

export const getMyTimetableSortBy = async (sortBy: 'earliest' | 'latest') => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE_SORT_BY(sortBy),
  );
  return response.data;
};

export const deleteMyTimetables = async (timetableIds: number[]) => {
  const response = await patch<BaseResponse<null>>(
    END_POINT.DELETE_MY_TIMETABLES,
    {
      deleteTimetableIds: timetableIds,
    },
  );

  return response.data;
};
