import { useQuery } from '@tanstack/react-query';
import { SEARCH_ARTIST_QUERY_OPTION } from '@shared/apis/search/search-queries';

interface UseArtistProps {
  keyword: string;
  enabled: boolean;
}

export const useSearchArtist = ({ keyword, enabled }: UseArtistProps) => {
  const { data } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTION.SEARCH_ARTIST(keyword, enabled),
  });

  return data;
};
