import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SEARCH_ARTIST_QUERY_OPTION } from '@shared/apis/search/search-queries';
import {
  SEARCH_PAGE_QUERY_OPTION,
  SEARCH_PERFORMANCE_QUERY_OPTION,
} from '@shared/apis/search/search-queries';
import { IntendedPerformanceRequest } from '@shared/types/search-reponse';

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

export const usePopularSearch = () => {
  const { data } = useSuspenseQuery({
    ...SEARCH_PAGE_QUERY_OPTION.SEARCH_POPULAR_SEARCH(),
  });

  return { data };
};

export const useRecentView = (items: string) => {
  const { data } = useSuspenseQuery({
    ...SEARCH_PAGE_QUERY_OPTION.RECENT_VIEW(items),
  });

  return { data };
};
