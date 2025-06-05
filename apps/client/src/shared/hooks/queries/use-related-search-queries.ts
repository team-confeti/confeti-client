import { useQueries } from '@tanstack/react-query';

import { SEARCH_QUERY_OPTIONS } from '@shared/apis/search/search-queries';

interface KeywordProps {
  keyword: string;
  enabled: boolean;
}

const LIMIT = {
  ARTIST: 5,
  PERFORMANCE: 4,
} as const;

export const useRelatedSearch = ({ keyword, enabled }: KeywordProps) => {
  return useQueries({
    queries: [
      SEARCH_QUERY_OPTIONS.SEARCH_RELATED_ARTISTS(
        keyword,
        LIMIT.ARTIST,
        enabled,
      ),
      SEARCH_QUERY_OPTIONS.SEARCH_RELATED_PERFORMANCES(
        keyword,
        LIMIT.PERFORMANCE,
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
