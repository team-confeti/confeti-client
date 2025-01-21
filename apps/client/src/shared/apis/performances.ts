import { BaseResponse } from '@shared/types/api';
import { Performances } from '@shared/types/performance-response';
import { END_POINT } from '@shared/constants/api';
import { get } from './config/instance';

export const getPerformances = async (): Promise<Performances> => {
  const response = await get<BaseResponse<Performances>>(
    END_POINT.GET_PERFORMANCE_DETAIL,
  );
  return response.data;
};
