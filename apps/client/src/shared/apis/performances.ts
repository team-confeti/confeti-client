import { BaseResponse } from '@shared/types/api';
import { Performance } from '@shared/types/performance-response';
import { END_POINT } from '@shared/constants/api';
import { get } from './config/instance';

interface PerformanceResponse {
  performances: Performance[];
}

export const getPerformances = async (): Promise<PerformanceResponse> => {
  const response = await get<BaseResponse<PerformanceResponse>>(
    END_POINT.GET_PERFORMANCE_FAVORITE,
  );
  return response.data;
};
