import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

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
  FestivalCreateDTO,
  FestivalDetailDTO,
  FestivalListDTO,
  FestivalUpdateDTO,
} from '@shared/types/api';
import { createFestivalFormData } from '@shared/utils/form-data';

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

export const postFestival = async (
  festival: FestivalCreateDTO | FestivalUpdateDTO,
): Promise<void> => {
  const formData = createFestivalFormData(festival);
  await post(END_POINT.FESTIVAL, formData);
};

export const patchFestival = async (
  festivalId: number,
  festival: FestivalCreateDTO | FestivalUpdateDTO,
): Promise<void> => {
  const formData = createFestivalFormData(festival);
  await patch(END_POINT.FESTIVAL_DETAIL(festivalId), formData);
};
