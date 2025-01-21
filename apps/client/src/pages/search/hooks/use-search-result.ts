import { useQuery } from '@tanstack/react-query';
import { SEARCH_QUERY_OPTIONS } from '@shared/apis/search/search-queries';

interface UseArtistProps {
  keyword: string;
  enabled: boolean;
}

export const useSearchArtist = ({ keyword, enabled }: UseArtistProps) => {
  const { data } = useQuery({
    ...SEARCH_QUERY_OPTIONS.SEARCH_ARTIST(keyword, enabled),
  });

  return data;
};
