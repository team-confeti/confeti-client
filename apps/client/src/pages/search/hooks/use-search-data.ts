import {
  useQueries,
  useQuery,
  useSuspenseQueries,
} from '@tanstack/react-query';

import { SEARCH_ARTIST_QUERY_OPTION } from '@shared/apis/search/search-queries';
import { SEARCH_ARTIST_RELATED_QUERY_OPTION } from '@shared/apis/search/search-queries';

import { SEARCH_PERFORMANCE_QUERY_OPTION } from './../../../shared/apis/search/search-queries';

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

export const useArtistRelatedData = (artistId: string | null) => {
  const results = useSuspenseQueries({
    queries: [
      {
        ...SEARCH_ARTIST_RELATED_QUERY_OPTION.SEARCH_RELATED_PERFORMANCES(
          artistId,
        ),
      },
    ],
  });

  const [performancesQuery] = results;

  return {
    performancesData: performancesQuery?.data,
  };
};

export const useRelatedSearch = ({ keyword, enabled }: UseArtistProps) => {
  return useQueries({
    queries: [
      SEARCH_ARTIST_QUERY_OPTION.SEARCH_RELATED_KEYWORD(keyword, enabled),
      SEARCH_PERFORMANCE_QUERY_OPTION.SEARCH_RELATED_PERFORMANCES(
        keyword,
        enabled,
      ),
    ],
    combine: (results) => ({
      data: {
        relatedArtists: results[0].data,
        relatedPerformances: results[1].data,
      },
      isLoading: results.some((r) => r.isLoading),
    }),
  });
};
