import { useQueries } from '@tanstack/react-query';

import {
  SEARCH_ARTIST_QUERY_OPTION,
  SEARCH_PERFORMANCE_QUERY_OPTION,
} from '@shared/apis/search/search-queries';

interface KeywordProps {
  keyword: string;
  enabled: boolean;
}

export const useRelatedSearch = ({ keyword, enabled }: KeywordProps) => {
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
