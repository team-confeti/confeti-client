import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  CarouselPerformancesResponse,
  SuggestMusicPerformanceResponse,
  SuggestPerformanceResponse,
  TicketingPerformancesResponse,
} from '@shared/types/home-response';

import { get, patch } from '../config/instance';

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

export const getSuggestMusicPerformance =
  async (): Promise<SuggestMusicPerformanceResponse> => {
    const response = await get<BaseResponse<SuggestMusicPerformanceResponse>>(
      END_POINT.GET_SUGGEST_MUSIC_PERFORMANCE,
    );
    return response.data;
  };
