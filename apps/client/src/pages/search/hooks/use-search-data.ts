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
  const [RelatedArtistsResult, RelatedPerformancesResult] = useQueries({
    queries: [
      {
        ...SEARCH_ARTIST_QUERY_OPTION.SEARCH_RELATED_KEYWORD(keyword, enabled),
      },
      {
        ...SEARCH_PERFORMANCE_QUERY_OPTION.SEARCH_RELATED_PERFORMANCES(
          keyword,
          enabled,
        ),
      },
    ],
  });

  return {
    relatedArtistsData: RelatedArtistsResult.data,
    relatedPerformancesData: RelatedPerformancesResult.data,
    isLoading: RelatedArtistsResult.isLoading,
  };
};
