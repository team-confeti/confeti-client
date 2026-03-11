import { mutationOptions } from '@tanstack/react-query';

import { put } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { CONCERT_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  PutAdminConcertRequest,
  PutAdminConcertResponse,
} from '@shared/types/api';

type PutConcertParams = {
  request: PutAdminConcertRequest;
  poster: File;
};

export const CONCERT_MUTATION_OPTIONS = {
  PUT_CONCERT: () =>
    mutationOptions({
      mutationKey: CONCERT_MUTATION_KEY.PUT_CONCERT(),
      mutationFn: (params: PutConcertParams) =>
        putConcert(params.request, params.poster),
    }),
};

export const putConcert = async (
  request: PutAdminConcertRequest,
  poster: File,
): Promise<PutAdminConcertResponse> => {
  const formData = new FormData();
  formData.append(
    'concert',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  );
  formData.append('poster', poster);

  return put<PutAdminConcertResponse>(END_POINT.PUT_CONCERT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
