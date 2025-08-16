import { useMutation } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { postReissueToken } from '@shared/apis/auth/auth-mutation';
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
        await postReissueToken();
      } catch (error) {
        console.log('error', error);
      }
    },
  });
};
