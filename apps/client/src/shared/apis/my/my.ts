import { BaseResponse } from '@shared/types/api';
import { FavoriteArtistsResponses } from '@shared/types/favorite-artists-response';
import { END_POINT } from '@shared/constants/api';
import { get } from '../config/instance';

export const getFavoriteArtists =
  async (): Promise<FavoriteArtistsResponses> => {
    const response = await get<BaseResponse<FavoriteArtistsResponses>>(
      END_POINT.GET_FAVORITE_ARTISTS,
    );
    return response.data;
  };
