import { BaseResponse } from '@confeti/core/http';

import { post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';

export const postAuthOnboarding = async (
  favoriteArtists: string[],
): Promise<void> => {
  const requestBody = {
    favoriteArtists: favoriteArtists.map((id) => ({ artistId: id })),
  };
  await post<BaseResponse<null>>(END_POINT.POST_AUTH_ONBOARD, requestBody);
};
