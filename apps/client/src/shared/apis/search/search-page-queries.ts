import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { SEARCH_QUERY_KEY } from '@shared/constants/query-key';
import {
  PopularSearchResponse,
  RecentPerformanceViewResponse,
} from '@shared/types/search-response';

export const SEARCH_PAGE_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: SEARCH_QUERY_KEY.ALL }),
  SEARCH_POPULAR_SEARCH: (limit: number) =>
    queryOptions({
      queryKey: SEARCH_QUERY_KEY.SEARCH_POPULAR_SEARCH(),
      queryFn: () => getPopularSearch(limit),
    }),
  RECENT_VIEW: (items: string, enabled: boolean) =>
    queryOptions({
      queryKey: SEARCH_QUERY_KEY.RECENT_VIEW(items),
      queryFn: () => getRecentView(items),
      enabled,
    }),
};

export const getPopularSearch = async (
  limit: number,
): Promise<PopularSearchResponse> => {
  const response = await get<BaseResponse<PopularSearchResponse>>(
    `${END_POINT.GET_POPULAR_SEARCH(limit)}`,
  );

  return response.data;
};

export const getRecentView = async (
  items: string,
): Promise<RecentPerformanceViewResponse> => {
  const response = await get<BaseResponse<RecentPerformanceViewResponse>>(
    `${END_POINT.GET_RECENT_VIEW(items)}`,
  );
  return response.data;
};
