import { mutationOptions } from '@tanstack/react-query';

import { del, put } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { CONCERT_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  PutAdminConcertRequest,
  PutAdminConcertResponse,
} from '@shared/types/api';

type PutConcertParams = {
  concert: PutAdminConcertRequest;
  poster: File;
};

export const CONCERT_MUTATION_OPTIONS = {
  PUT_CONCERT: () =>
    mutationOptions({
      mutationKey: CONCERT_MUTATION_KEY.PUT_CONCERT(),
      mutationFn: (params: PutConcertParams) =>
        putConcert(params.concert, params.poster),
    }),
  DELETE_CONCERT: () =>
    mutationOptions({
      mutationKey: CONCERT_MUTATION_KEY.DELETE_CONCERT(),
      mutationFn: (concertId: number) => deleteConcert(concertId),
    }),
};

export const putConcert = async (
  concert: PutAdminConcertRequest,
  poster: File,
): Promise<PutAdminConcertResponse> => {
  const formData = new FormData();
  formData.append(
    'concert',
    new Blob([JSON.stringify(concert)], { type: 'application/json' }),
  );
  formData.append('poster', poster);

  return put<PutAdminConcertResponse>(END_POINT.PUT_CONCERT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteConcert = async (concertId: number): Promise<void> => {
  await del(END_POINT.DELETE_CONCERT(concertId));
};
