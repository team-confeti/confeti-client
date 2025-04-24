import { END_POINT } from '@shared/constants/api';
import { SortOption } from '@shared/constants/sort-label';
import { BaseResponse } from '@shared/types/api';
import { MyHistoryResponse } from '@shared/types/my-history-response';

import { get } from '../config/instance';

export const getMyTimeTablePreview = async () => {
  const response = await get<BaseResponse<MyHistoryResponse>>(
    END_POINT.GET_MY_TIMETABLE,
  );
  return response.data;
};

export const getMyTimeTableOverView = async (sortBy: SortOption) => {
  const response = await get<BaseResponse<MyHistoryResponse>>(
    END_POINT.GET_MY_TIMETABLE_OVERVIEW(sortBy),
  );
  return response.data;
};
