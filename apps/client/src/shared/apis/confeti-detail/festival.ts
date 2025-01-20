import { BaseResponse } from '@shared/types/api';
import { FestivalDetailResponse } from '@shared/types/festival-response';
import { END_POINT } from '@shared/constants/api';
import { axiosInstance } from '../config/instance';

export const getFestivalDetail = async (
  festivalId: number,
): Promise<FestivalDetailResponse> => {
  const response = await axiosInstance.get<
    BaseResponse<FestivalDetailResponse>
  >(`${END_POINT.GET_FESTIVAL_DETAIL}/${festivalId}`);
  return response.data.data;
};
