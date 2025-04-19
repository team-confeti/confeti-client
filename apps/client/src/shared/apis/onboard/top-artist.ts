import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

import { axiosInstance } from '../config/instance';

export const getTopArtist = async (): Promise<onboardResponse> => {
  const response = await axiosInstance.get<BaseResponse<onboardResponse>>(
    END_POINT.GET_TOP100_ARTIST,
  );
  return response.data.data;
};
