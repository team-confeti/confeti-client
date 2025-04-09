import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { ConcertDetailResponse } from '@shared/types/concert-response';
import { FestivalDetailResponse } from '@shared/types/festival-response';

import { axiosPublicInstance } from '../config/instance';

export const getConcertDetail = async (
  concertId: number,
): Promise<ConcertDetailResponse> => {
  const response = await axiosPublicInstance.get<
    BaseResponse<ConcertDetailResponse>
  >(`${END_POINT.GET_CONCERT_DETAIL}/${concertId}`);
  return response.data.data;
};

export const getFestivalDetail = async (
  festivalId: number,
): Promise<FestivalDetailResponse> => {
  const response = await axiosPublicInstance.get<
    BaseResponse<FestivalDetailResponse>
  >(`${END_POINT.GET_FESTIVAL_DETAIL}/${festivalId}`);
  return response.data.data;
};
