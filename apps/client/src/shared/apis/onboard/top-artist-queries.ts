import { queryOptions } from '@tanstack/react-query';

import { get, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { TOP_100_ARTIST_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

export const TOP_ARTIST_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: TOP_100_ARTIST_QUERY_KEY.ALL }),
  TOP_ARTIST: (limit: number) =>
    queryOptions({
      queryKey: TOP_100_ARTIST_QUERY_KEY.TOP_ARTIST(limit),
      queryFn: () => getTopArtist(limit),
    }),
};

export const getTopArtist = async (limit: number): Promise<onboardResponse> => {
  const response = await get<BaseResponse<onboardResponse>>(
    END_POINT.GET_TOP100_ARTIST(limit),
  );

  return response.data;
};

export const postAuthOnboarding = async (
  favoriteArtists: string[],
): Promise<void> => {
  const requestBody = {
    favoriteArtists: favoriteArtists.map((id) => ({ artistId: id })),
  };
  await post<BaseResponse<null>>(END_POINT.POST_AUTH_ONBOARD, requestBody);
};
