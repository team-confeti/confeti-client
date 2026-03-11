import { mutationOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { put } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  PutAdminFestivalRequest,
  PutAdminFestivalResponse,
} from '@shared/types/api';

type PutFestivalParams = {
  request: PutAdminFestivalRequest;
  poster?: File;
  logo?: File;
};

export const FESTIVAL_MUTATION_OPTIONS = {
  PUT_FESTIVAL: () =>
    mutationOptions({
      mutationKey: FESTIVAL_MUTATION_KEY.PUT_FESTIVAL(),
      mutationFn: (params: PutFestivalParams) =>
        putFestival(params.request, params.poster, params.logo),
    }),
};

export const putFestival = async (
  request: PutAdminFestivalRequest,
  poster?: File,
  logo?: File,
): Promise<PutAdminFestivalResponse> => {
  const formData = new FormData();
  formData.append(
    'festival',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  );
  if (poster) formData.append('poster', poster);
  if (logo) formData.append('logo', logo);

  const response = await put<BaseResponse<PutAdminFestivalResponse>>(
    END_POINT.PUT_FESTIVAL,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data;
};
