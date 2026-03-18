import { mutationOptions } from '@tanstack/react-query';

import { del, put } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  PutAdminFestivalRequest,
  PutAdminFestivalResponse,
} from '@shared/types/api';

type PutFestivalParams = {
  festival: PutAdminFestivalRequest;
  poster?: File;
  logo?: File;
};

export const FESTIVAL_MUTATION_OPTIONS = {
  PUT_FESTIVAL: () =>
    mutationOptions({
      mutationKey: FESTIVAL_MUTATION_KEY.PUT_FESTIVAL(),
      mutationFn: (params: PutFestivalParams) =>
        putFestival(params.festival, params.poster, params.logo),
    }),
  DELETE_FESTIVAL: () =>
    mutationOptions({
      mutationKey: FESTIVAL_MUTATION_KEY.DELETE_FESTIVAL(),
      mutationFn: (festivalId: number) => deleteFestival(festivalId),
    }),
};

export const putFestival = async (
  festival: PutAdminFestivalRequest,
  poster?: File,
  logo?: File,
): Promise<PutAdminFestivalResponse> => {
  const formData = new FormData();
  formData.append(
    'festival',
    new Blob([JSON.stringify(festival)], { type: 'application/json' }),
  );
  if (poster) {
    formData.append('poster', poster);
  }
  if (logo) formData.append('logo', logo);

  return put<PutAdminFestivalResponse>(END_POINT.PUT_FESTIVAL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteFestival = async (festivalId: number): Promise<void> => {
  await del(END_POINT.DELETE_FESTIVAL(festivalId));
};
