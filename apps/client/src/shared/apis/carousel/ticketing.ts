import { BaseResponse } from '@shared/types/api';
import { END_POINT } from '@shared/constants/api';
import { TicketingResponse } from '@shared/types/ticketing-response';
import { axiosPublicInstance } from '../config/instance';

export const getTicketing = async (): Promise<TicketingResponse> => {
  const response = await axiosPublicInstance.get<
    BaseResponse<TicketingResponse>
  >(END_POINT.GET_TICKETING);
  return response.data.data;
};
