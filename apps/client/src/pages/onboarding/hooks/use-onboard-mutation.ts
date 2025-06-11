import { useMutation } from '@tanstack/react-query';

import { getArtistRelatedArtist } from '@shared/apis/onboard/artist-related-queries';
import { postAuthOnboarding } from '@shared/apis/onboard/onboard-mutation';
import { BaseResponse } from '@shared/types/api';
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
    mutationFn: (favoriteArtists: string[]) => {
      return postAuthOnboarding(favoriteArtists);
    },
  });
};
