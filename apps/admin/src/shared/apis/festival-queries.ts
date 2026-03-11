import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_QUERY_KEY } from '@shared/constants/query-key';
import {
  AdminFestivalDetailResponse,
  AdminFestivalListResponse,
} from '@shared/types/api';

export const FESTIVAL_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: FESTIVAL_QUERY_KEY.ALL }),
  LIST: () =>
    queryOptions({
      queryKey: FESTIVAL_QUERY_KEY.LIST(),
      queryFn: getFestivalList,
    }),
  DETAIL: (festivalId: number) =>
    queryOptions({
      queryKey: FESTIVAL_QUERY_KEY.DETAIL(festivalId),
      queryFn: () => getFestivalDetail(festivalId),
    }),
};

export const getFestivalList = async (): Promise<AdminFestivalListResponse> => {
  const response = await get<BaseResponse<AdminFestivalListResponse>>(
    END_POINT.GET_FESTIVALS,
  );
  return response.data;
};

export const getFestivalDetail = async (
  festivalId: number,
): Promise<AdminFestivalDetailResponse> => {
  const response = await get<BaseResponse<AdminFestivalDetailResponse>>(
    END_POINT.GET_FESTIVAL_DETAIL(festivalId),
  );
  return response.data;
};
