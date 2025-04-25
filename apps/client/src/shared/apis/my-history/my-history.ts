import { END_POINT } from '@shared/constants/api';
import { SortOption } from '@shared/constants/sort-label';
import { BaseResponse } from '@shared/types/api';
import {
  MyHistoryRecord,
  MyHistorySetListResponse,
  MyHistoryTimetableResponse,
} from '@shared/types/my-history-response';

import { get } from '../config/instance';

export const getMyTimeTablePreview = async () => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE,
  );
  return response.data;
};

export const getMyTimeTableOverView = async (sortBy: SortOption) => {
  const response = await get<BaseResponse<MyHistoryTimetableResponse>>(
    END_POINT.GET_MY_TIMETABLE_OVERVIEW(sortBy),
  );
  return response.data;
};

export const getMySetListPreview = async () => {
  const response = await get<BaseResponse<MyHistorySetListResponse>>(
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

export const getMyHistoryRecord = async () => {
  const response = await get<BaseResponse<MyHistoryRecord>>(
    END_POINT.GET_MY_RECORD,
  );
  return response.data;
};
