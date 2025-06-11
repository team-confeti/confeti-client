import { queryOptions } from '@tanstack/react-query';

import { get, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { CONCERT_QUERY_KEY } from '@shared/constants/query-key';
import {
  Concert,
  ConcertListItem,
  toConcert,
  toConcertCreateDTO,
  toConcertListItem,
} from '@shared/models/concert';
import {
  BaseResponse,
  ConcertDetailDTO,
  ConcertListDTO,
} from '@shared/types/api';

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
  const formData = new FormData();
  const dto = toConcertCreateDTO(concert);

  formData.append('posterImg', dto.posterImg);
  dto.reservationUrls.forEach((url, index) => {
    formData.append(`reservationUrls[${index}].logoImg`, url.logoImg);
  });

  const jsonData = {
    ...dto,
    posterImg: undefined,
    reservationUrls: dto.reservationUrls.map((url) => ({
      ...url,
      logoImg: undefined,
    })),
  };
  formData.append('data', JSON.stringify(jsonData));

  const response = await post<BaseResponse<ConcertDetailDTO>>(
    END_POINT.CONCERT,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return toConcert(response.data);
};

export const patchConcert = async (
  concertId: number,
  concert: Concert,
): Promise<Concert> => {
  const formData = new FormData();
  const dto = toConcertCreateDTO(concert);

  formData.append('posterImg', dto.posterImg);
  dto.reservationUrls.forEach((url, index) => {
    formData.append(`reservationUrls[${index}].logoImg`, url.logoImg);
  });

  const jsonData = {
    ...dto,
    posterImg: undefined,
    reservationUrls: dto.reservationUrls.map((url) => ({
      ...url,
      logoImg: undefined,
    })),
  };
  formData.append('data', JSON.stringify(jsonData));

  const response = await patch<BaseResponse<ConcertDetailDTO>>(
    END_POINT.CONCERT_DETAIL(concertId),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return toConcert(response.data);
};
