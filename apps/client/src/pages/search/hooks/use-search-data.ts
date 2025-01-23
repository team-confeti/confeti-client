import { useQuery } from '@tanstack/react-query';
import {
  SEARCH_ARTIST_QUERY_OPTION,
  SEARCH_PERFORMANCES_QUERY_OPTION,
} from '@shared/apis/search/search-queries';

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

interface UsePerformancesProps {
  artistId: string;
  cursor: number;
  enabled: boolean;
}

export const useSearchPerformances = ({
  artistId,
  cursor,
  enabled,
}: UsePerformancesProps) => {
  const isQueryEnabled = !!artistId && enabled;
  const { data } = useQuery({
    ...SEARCH_PERFORMANCES_QUERY_OPTION.SEARCH_PERFORMANCES(
      artistId,
      cursor,
      isQueryEnabled,
    ),
  });

  return data;
};
