import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { CONCERT_QUERY_KEY } from '@shared/constants/query-key';
import {
  AdminConcertDetailResponse,
  AdminConcertListQueryResponse,
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

export const getConcertList =
  async (): Promise<AdminConcertListQueryResponse> => {
    return get<AdminConcertListQueryResponse>(END_POINT.GET_CONCERTS);
  };

export const getConcertDetail = async (
  concertId: number,
): Promise<AdminConcertDetailResponse> => {
  return get<AdminConcertDetailResponse>(
    END_POINT.GET_CONCERT_DETAIL(concertId),
  );
};
