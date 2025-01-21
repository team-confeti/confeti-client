import { BaseResponse } from '@shared/types/api';
import { FestivalDetailResponse } from '@shared/types/festival-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '../config/instance';

export const getFestivalDetail = async (
  festivalId: number,
): Promise<FestivalDetailResponse> => {
  const response = await get<BaseResponse<FestivalDetailResponse>>(
    `${END_POINT.GET_FESTIVAL_DETAIL}/${festivalId}`,
  );
  return response.data;
};
