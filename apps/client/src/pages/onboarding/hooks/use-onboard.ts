import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getArtistRelatedArtist } from '@shared/apis/onboard/artist-related';
import { ARTIST_RELATED_QUERY_OPTION } from '@shared/apis/onboard/artist-related-queries';
import { postAuthOnboarding } from '@shared/apis/onboard/auth-onboard';
import { TOP_ARTIST_QUERY_OPTION } from '@shared/apis/onboard/top-artist-queries';
import { BaseResponse } from '@shared/types/api';
import { onboardResponse } from '@shared/types/onboard-response';

interface UseArtistRelatedKeywordProps {
  keyword: string;
  enabled: boolean;
  limit: number;
}

export const useGetTopArtist = (limit: number) => {
  const { data } = useSuspenseQuery({
    ...TOP_ARTIST_QUERY_OPTION.TOP_ARTIST(limit),
  });

  return { data };
};

export const useArtistRelatedKeyword = ({
  keyword,
  enabled,
  limit,
}: UseArtistRelatedKeywordProps) => {
  const { data } = useQuery({
    ...ARTIST_RELATED_QUERY_OPTION.KEYWORD(keyword, limit),
    enabled,
  });

  return data;
};

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
