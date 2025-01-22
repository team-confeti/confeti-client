import { BaseResponse } from '@shared/types/api';
import { GetFestivalToAddResponse } from '@shared/types/get-festival-to-add-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '../config/instance';

export const getFestivalToAdd = async (
  cursor?: number,
): Promise<GetFestivalToAddResponse> => {
  const response = await get<BaseResponse<GetFestivalToAddResponse>>(
    END_POINT.GET_FESTIVAL_TO_ADD(cursor),
  );
  return response.data;
};
