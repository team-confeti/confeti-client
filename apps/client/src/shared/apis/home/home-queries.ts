import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { HOME_QUERY_KEY } from '@shared/constants/query-key';
import {
  CarouselPerformancesResponse,
  RecommendPerformancesResponse,
  SuggestPerformanceResponse,
  TicketingPerformancesResponse,
} from '@shared/types/home-response';

import { get } from '../config/instance';

export const HOME_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: HOME_QUERY_KEY.ALL }),
  LATEST_PERFORMANCES: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.LATEST_PERFORMANCES(),
      queryFn: getLatestPerformances,
    }),
  TICKETING: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.TICKETING(),
      queryFn: getTicketing,
    }),
  SUGGEST_PERFORMANCE: () =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.SUGGEST_PERFORMANCE(),
      queryFn: getSuggestPerformance,
    }),
  RECOMMEND_PERFORMANCES: (performanceSize: number, songSize: number) =>
    queryOptions({
      queryKey: HOME_QUERY_KEY.RECOMMEND_PERFORMANCES(
        performanceSize,
        songSize,
      ),
      queryFn: () => getRecommendPerformances(performanceSize, songSize),
    }),
};

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
      END_POINT.GET_SUGGEST_PERFORMANCE(10),
    );
    return response.data;
  };

export const getRecommendPerformances = async (
  performanceSize: number,
  songSize: number,
): Promise<RecommendPerformancesResponse> => {
  const response = await get<BaseResponse<RecommendPerformancesResponse>>(
    END_POINT.GET_SUGGEST_MUSIC_PERFORMANCE(performanceSize, songSize),
  );

  return response.data ?? { performances: [] };
};
