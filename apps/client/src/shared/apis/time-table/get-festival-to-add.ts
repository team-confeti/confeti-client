import { BaseResponse } from '@shared/types/api';
import { GetFestivalToAddResponse } from '@shared/types/get-festival-to-add-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '../config/instance';

export const getFestivalToAdd = async (
  cursor?: number,
): Promise<GetFestivalToAddResponse> => {
  // cursor가 유효한 숫자일 때만 쿼리 파라미터 추가
  const url =
    typeof cursor === 'number' && cursor >= 0
      ? `${END_POINT.GET_FESTIVAL_TO_ADD}?cursor=${cursor}`
      : END_POINT.GET_FESTIVAL_TO_ADD;

  const response = await get<BaseResponse<GetFestivalToAddResponse>>(url);
  return response.data;
};
