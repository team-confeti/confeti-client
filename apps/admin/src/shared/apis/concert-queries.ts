import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { CONCERT_QUERY_KEY } from '@shared/constants/query-key';
import {
  Concert,
  ConcertListItem,
  toConcert,
  toConcertListItem,
} from '@shared/models/concert';
import { ConcertDetailDTO, ConcertListDTO } from '@shared/types/api';
import { createConcertFormData } from '@shared/utils/form-data';

export const CONCERT_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: CONCERT_QUERY_KEY.ALL }),
  CONCERT: (concertId: number) =>
    queryOptions({
      queryKey: CONCERT_QUERY_KEY.CONCERT(concertId),
      queryFn: () => getConcert(concertId),
    }),
  CONCERT_LIST: () =>
    queryOptions({
      queryKey: CONCERT_QUERY_KEY.ALL,
      queryFn: getConcertList,
    }),
};

export const getConcert = async (concertId: number): Promise<Concert> => {
  const response = await get<BaseResponse<ConcertDetailDTO>>(
    END_POINT.CONCERT_DETAIL(concertId),
  );
  return toConcert(response.data);
};

export const getConcertList = async (): Promise<ConcertListItem[]> => {
  const response = await get<BaseResponse<ConcertListDTO>>(END_POINT.CONCERT);
  return response.data.concerts.map(toConcertListItem);
};

export const postConcert = async (concert: Concert): Promise<Concert> => {
  const formData = createConcertFormData(concert);

  const response = await post<BaseResponse<ConcertDetailDTO>>(
    END_POINT.CONCERT,
    formData,
  );
  return toConcert(response.data);
};

export const patchConcert = async (
  concertId: number,
  concert: Concert,
): Promise<Concert> => {
  const formData = createConcertFormData(concert);

  const response = await patch<BaseResponse<ConcertDetailDTO>>(
    END_POINT.CONCERT_DETAIL(concertId),
    formData,
  );
  return toConcert(response.data);
};
