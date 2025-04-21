import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { PerformanceResponse } from '@shared/types/performance-response';

import { get } from '../config/instance';

export const getLatestPerformances = async (): Promise<PerformanceResponse> => {
  const response = await get<BaseResponse<PerformanceResponse>>(
    END_POINT.GET_LATEST_PERFORMANCES,
  );
  return response.data;
};
