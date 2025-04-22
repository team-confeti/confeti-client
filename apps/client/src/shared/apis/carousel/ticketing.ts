import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { TicketingResponse } from '@shared/types/ticketing-response';

import { get } from '../config/instance';

export const getTicketing = async (): Promise<TicketingResponse> => {
  const response = await get<BaseResponse<TicketingResponse>>(
    END_POINT.GET_TICKETING,
  );
  return response.data;
};
