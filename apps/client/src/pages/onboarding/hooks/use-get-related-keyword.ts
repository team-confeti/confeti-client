import { useQuery } from '@tanstack/react-query';

import { ARTIST_RELATED_KEYWORDS_QUERY_OPTION } from '@shared/apis/onboard/artist-related-keywords-queries';

interface UseArtistRelatedKeywordProps {
  keyword: string;
  enabled: boolean;
}

export const useArtistRelatedKeyword = ({
  keyword,
  enabled,
}: UseArtistRelatedKeywordProps) => {
  const { data } = useQuery({
    ...ARTIST_RELATED_KEYWORDS_QUERY_OPTION.RELATED_KEYWORD(keyword),
    enabled,
  });

  return data;
};
