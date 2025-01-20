import { BaseResponse } from '@shared/types/api';
import { ConcertDetailResponse } from '@shared/types/concert-response';
import { END_POINT } from '@shared/constants/api';
import { instance } from './api';

export const getConcertDetail = async (
  concertId: number,
): Promise<ConcertDetailResponse> => {
  const response = await instance.get<BaseResponse<ConcertDetailResponse>>(
    `${END_POINT.GET_CONCERT_DETAIL}/${concertId}`,
  );
  return response.data.data;
};
