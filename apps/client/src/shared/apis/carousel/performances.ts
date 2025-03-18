import { BaseResponse } from '@shared/types/api';
import { END_POINT } from '@shared/constants/api';
import { PerformanceResponse } from '@shared/types/performance-response';
import { axiosPublicInstance } from '../config/instance';

export const getLatestPerformances = async (): Promise<PerformanceResponse> => {
  const response = await axiosPublicInstance.get<
    BaseResponse<PerformanceResponse>
  >(END_POINT.GET_LATEST_PERFORMANCES);
  return response.data.data;
};
