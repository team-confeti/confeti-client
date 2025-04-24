import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';

import { post } from '../config/instance';

export const postAuthOnboarding = async (
  favoriteArtists: string[],
): Promise<void> => {
  const requestBody = {
    favoriteArtists: favoriteArtists.map((id) => ({ artistId: id })),
  };
  await post<BaseResponse<null>>(END_POINT.POST_AUTH_ONBOARD, requestBody);
};
