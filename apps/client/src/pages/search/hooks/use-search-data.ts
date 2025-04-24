import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SEARCH_ARTIST_QUERY_OPTION } from '@shared/apis/search/search-queries';
import { IntendedPerformanceRequest } from '@shared/types/search-reponse';

import { SEARCH_PERFORMANCE_QUERY_OPTION } from './../../../shared/apis/search/search-queries';

interface KeywordProps {
  keyword: string;
  enabled: boolean;
}

export const useSearchArtist = ({ keyword, enabled }: KeywordProps) => {
  const { data, isLoading } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTION.SEARCH_ARTIST(keyword, enabled),
  });

  return { data, isLoading };
};

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

export const usePerformanceTypeAnalysis = ({
  keyword,
  enabled,
}: KeywordProps) => {
  const { data, isLoading } = useQuery({
    ...SEARCH_PERFORMANCE_QUERY_OPTION.SEARCH_PERFORMANCE_TYPE_ANALYSIS(
      keyword,
      enabled,
    ),
  });

  return { data, isLoading };
};

interface UseIntendedPerformanceProps {
  request: IntendedPerformanceRequest;
}

export const useIntendedPerformance = ({
  request,
}: UseIntendedPerformanceProps) => {
  const { data } = useSuspenseQuery({
    ...SEARCH_PERFORMANCE_QUERY_OPTION.SEARCH_INTENDED_PERFORMANCE(request),
  });

  return { data };
};
