import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SEARCH_ARTIST_QUERY_OPTION } from '@shared/apis/search/search-queries';
import { SEARCH_PERFORMANCES_QUERY_OPTION } from '@shared/apis/search/search-queries';

interface UseArtistProps {
  keyword: string;
  enabled: boolean;
}

export const useSearchArtist = ({ keyword, enabled }: UseArtistProps) => {
  const { data, isLoading } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTION.SEARCH_ARTIST(keyword, enabled),
  });

  return { data, isLoading };
};

export const useSearchPerformances = (artistId: string) => {
  const { data } = useSuspenseQuery({
    ...SEARCH_PERFORMANCES_QUERY_OPTION.SEARCH_PERFORMANCES(artistId),
  });

  return { data };
};

export const useSearchRelatedKeyword = ({
  keyword,
  enabled,
}: UseArtistProps) => {
  const { data, isLoading } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTION.SEARCH_RELATED_KEYWORD(keyword, enabled),
  });

  return { data, isLoading };
};
