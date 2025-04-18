import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { TopArtistResponse } from '@shared/types/top-artist-response';

import { axiosInstance } from '../config/instance';

export const getTopArtist = async (): Promise<TopArtistResponse> => {
  const response = await axiosInstance.get<BaseResponse<TopArtistResponse>>(
    END_POINT.GET_TOP100_ARTIST,
  );
  return response.data.data;
};
