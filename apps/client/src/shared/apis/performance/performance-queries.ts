import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { PERFORMANCE_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import { ConcertDetailResponse } from '@shared/types/concert-response';
import { FestivalDetailResponse } from '@shared/types/festival-response';

export const PERFORMANCE_QUERY_OPTIONS = {
  CONCERT: (concertId: number) =>
    queryOptions({
      queryKey: PERFORMANCE_QUERY_KEY.CONCERT(concertId),
      queryFn: () => getConcertDetail(concertId),
    }),
  FESTIVAL: (festivalId: number) =>
    queryOptions({
      queryKey: PERFORMANCE_QUERY_KEY.FESTIVAL(festivalId),
      queryFn: () => getFestivalDetail(festivalId),
    }),
};

export const getConcertDetail = async (
  concertId: number,
): Promise<ConcertDetailResponse> => {
  const response = await get<BaseResponse<ConcertDetailResponse>>(
    `${END_POINT.GET_CONCERT_DETAIL}/${concertId}`,
  );
  return response.data;
};

export const getFestivalDetail = async (
  festivalId: number,
): Promise<FestivalDetailResponse> => {
  const response = await get<BaseResponse<FestivalDetailResponse>>(
    `${END_POINT.GET_FESTIVAL_DETAIL}/${festivalId}`,
  );
  return response.data;
};
