import { useMutation } from '@tanstack/react-query';

import { authTokenHandler, getRefreshToken } from '@confeti/core/auth';
import { BaseResponse } from '@confeti/core/http';

import { postReissueToken } from '@shared/apis/auth/auth-mutations';
import { postAuthOnboarding } from '@shared/apis/onboard/onboard-mutation';
import { getArtistRelatedArtist } from '@shared/apis/onboard/queries';
import { onboardResponse } from '@shared/types/onboard-response';

export const useArtistRelatedArtist = () => {
  return useMutation<
    BaseResponse<onboardResponse>,
    Error,
    { artistId: string; limit: number }
  >({
    mutationFn: ({ artistId, limit }) => {
      return getArtistRelatedArtist(artistId, limit);
    },
  });
};

export const usePostAuthOnboarding = () => {
  return useMutation({
    mutationFn: async (favoriteArtists: string[]) => {
      try {
        await postAuthOnboarding(favoriteArtists);
      } catch (error) {
        console.log('error', error);
      }

      try {
        const { data } = await postReissueToken(getRefreshToken());
        authTokenHandler('set', data.accessToken, data.refreshToken);
      } catch (error) {
        console.log('error', error);
      }
    },
  });
};
