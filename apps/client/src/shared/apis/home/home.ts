import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  CarouselPerformancesResponse,
  SuggestMusicResponse,
  SuggestPerformanceResponse,
  TicketingPerformancesResponse,
} from '@shared/types/home-response';

import { get } from '../config/instance';

export const getLatestPerformances =
  async (): Promise<CarouselPerformancesResponse> => {
    const response = await get<BaseResponse<CarouselPerformancesResponse>>(
      END_POINT.GET_LATEST_PERFORMANCES,
    );
    return response.data;
  };

export const getTicketing =
  async (): Promise<TicketingPerformancesResponse> => {
    const response = await get<BaseResponse<TicketingPerformancesResponse>>(
      END_POINT.GET_TICKETING,
    );
    return response.data;
  };

export const getSuggestPerformance =
  async (): Promise<SuggestPerformanceResponse> => {
    const response = await get<BaseResponse<SuggestPerformanceResponse>>(
      END_POINT.GET_SUGGEST_PERFORMANCE,
    );
    return response.data;
  };

export const getSuggestMusic = async (): Promise<SuggestMusicResponse> => {
  const response = await get<BaseResponse<SuggestMusicResponse>>(
    END_POINT.GET_SUGGEST_MUSIC,
  );
  return response.data;
};
