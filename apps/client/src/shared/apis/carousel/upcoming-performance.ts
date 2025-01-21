import { BaseResponse } from '@shared/types/api';
import { UpcomingPerformancesResponse } from '@shared/types/upcoming-performance-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '../config/instance';

export const getUpcomingPerformances =
  async (): Promise<UpcomingPerformancesResponse> => {
    const response = await get<BaseResponse<UpcomingPerformancesResponse>>(
      END_POINT.GET_UPCOMING_PERFORMANCES,
    );
    return response.data;
  };
