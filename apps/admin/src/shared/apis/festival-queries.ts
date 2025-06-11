import { queryOptions } from '@tanstack/react-query';

import { get, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_QUERY_KEY } from '@shared/constants/query-key';
import {
  Festival,
  FestivalListItem,
  toFestival,
  toFestivalListItem,
} from '@shared/models/festival';
import {
  BaseResponse,
  FestivalCreateDTO,
  FestivalDetailDTO,
  FestivalListDTO,
  FestivalUpdateDTO,
} from '@shared/types/api';

export const FESTIVAL_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: FESTIVAL_QUERY_KEY.ALL }),
  FESTIVAL: (festivalId: number) =>
    queryOptions({
      queryKey: FESTIVAL_QUERY_KEY.FESTIVAL(festivalId),
      queryFn: () => getFestival(festivalId),
    }),
  FESTIVAL_LIST: () =>
    queryOptions({
      queryKey: FESTIVAL_QUERY_KEY.ALL,
      queryFn: getFestivalList,
    }),
};

export const getFestival = async (festivalId: number): Promise<Festival> => {
  const response = await get<BaseResponse<FestivalDetailDTO>>(
    END_POINT.FESTIVAL_DETAIL(festivalId),
  );

  return toFestival(response.data);
};

export const getFestivalList = async (): Promise<FestivalListItem[]> => {
  const response = await get<BaseResponse<FestivalListDTO>>(END_POINT.FESTIVAL);
  return response.data.festivals.map(toFestivalListItem);
};

const createFormData = (
  festival: FestivalCreateDTO | FestivalUpdateDTO,
): FormData => {
  const formData = new FormData();

  if (festival.posterImg) {
    formData.append('posterImg', festival.posterImg);
  }
  if (festival.logoImg) {
    formData.append('logoImg', festival.logoImg);
  }
  if (festival.reservationUrls) {
    festival.reservationUrls.forEach((url, index) => {
      if (url.logoImg) {
        formData.append(`reservationUrls[${index}].logoImg`, url.logoImg);
      }
    });
  }

  const jsonData = {
    ...festival,
    posterImg: undefined,
    logoImg: undefined,
    reservationUrls: festival.reservationUrls?.map((url) => ({
      ...url,
      logoImg: undefined,
    })),
  };
  formData.append('data', JSON.stringify(jsonData));

  return formData;
};

export const postFestival = async (
  festival: FestivalCreateDTO,
): Promise<void> => {
  const formData = createFormData(festival);
  await post(END_POINT.FESTIVAL, formData);
};

export const patchFestival = async (
  festivalId: number,
  festival: FestivalUpdateDTO,
): Promise<void> => {
  const formData = createFormData(festival);
  await patch(END_POINT.FESTIVAL_DETAIL(festivalId), formData);
};
