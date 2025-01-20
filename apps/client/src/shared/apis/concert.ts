import { BaseResponse } from '@shared/types/api';
import { ConcertDetailResponse } from '@shared/types/concert-response';
import { END_POINT } from '@shared/constants/api';
import { axiosInstance } from './config/instance';

export const getConcertDetail = async (
  concertId: number,
): Promise<ConcertDetailResponse> => {
  const response = await axiosInstance.get<BaseResponse<ConcertDetailResponse>>(
    `${END_POINT.GET_CONCERT_DETAIL}/${concertId}`,
  );
  return response.data.data;
};
