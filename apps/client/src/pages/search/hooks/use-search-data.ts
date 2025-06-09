import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SEARCH_ARTIST_QUERY_OPTIONS } from '@shared/apis/search/search-artist-queries';
import { SEARCH_PAGE_QUERY_OPTIONS } from '@shared/apis/search/search-page-queries';
import { SEARCH_PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/search/search-performance-queries';
import { IntendedPerformanceRequest } from '@shared/types/search-reponse';

interface KeywordProps {
  keyword: string;
  enabled: boolean;
}

export const useSearchArtist = ({ keyword, enabled }: KeywordProps) => {
  const { data, isLoading, refetch } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTIONS.SEARCH_ARTIST(keyword, enabled),
  });

  return { data, isLoading, refetch };
};

export const usePerformanceTypeAnalysis = ({
  keyword,
  enabled,
}: KeywordProps) => {
  const { data, isLoading } = useQuery({
    ...SEARCH_PERFORMANCE_QUERY_OPTIONS.SEARCH_PERFORMANCE_TYPE_ANALYSIS(
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
    ...SEARCH_PERFORMANCE_QUERY_OPTIONS.SEARCH_INTENDED_PERFORMANCE(request),
  });

  return { data };
};

export const usePopularSearch = () => {
  const { data } = useSuspenseQuery({
    ...SEARCH_PAGE_QUERY_OPTIONS.SEARCH_POPULAR_SEARCH(),
  });

  return { data };
};

export const useRecentView = (items: string, enabled: boolean) => {
  const { data } = useQuery({
    ...SEARCH_PAGE_QUERY_OPTIONS.RECENT_VIEW(items, enabled),
  });

  return { data };
};
