import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { CONCERT_QUERY_KEY } from '@shared/constants/query-key';
import {
  AdminConcertDetailResponse,
  AdminConcertListResponse,
} from '@shared/types/api';

export const CONCERT_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: CONCERT_QUERY_KEY.ALL }),
  LIST: () =>
    queryOptions({
      queryKey: CONCERT_QUERY_KEY.LIST(),
      queryFn: getConcertList,
    }),
  DETAIL: (concertId: number) =>
    queryOptions({
      queryKey: CONCERT_QUERY_KEY.DETAIL(concertId),
      queryFn: () => getConcertDetail(concertId),
    }),
};

export const getConcertList = async (): Promise<AdminConcertListResponse> => {
  const response = await get<BaseResponse<AdminConcertListResponse>>(
    END_POINT.GET_CONCERTS,
  );
  return response.data;
};

export const getConcertDetail = async (
  concertId: number,
): Promise<AdminConcertDetailResponse> => {
  const response = await get<BaseResponse<AdminConcertDetailResponse>>(
    END_POINT.GET_CONCERT_DETAIL(concertId),
  );
  return response.data;
};
