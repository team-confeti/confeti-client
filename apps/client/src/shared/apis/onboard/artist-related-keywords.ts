import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

import { get } from '../config/instance';

export const getArtistRelatedKeyword = async (
  keyword: string,
): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_ARTIST_RELATED_KEYWORDS(keyword, 10),
  );
  return response.data;
};
