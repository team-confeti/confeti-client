import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getPerformancesSearch } from '@shared/apis/search/search';
import { SEARCH_ARTIST_QUERY_OPTION } from '@shared/apis/search/search-queries';
import { GetPerformancesSearchResponse } from '@shared/types/search-reponse';

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

interface UsePerformancesProps {
  artistId: string;
  enabled: boolean;
}

export const useSearchPerformances = ({
  artistId,
  enabled,
}: UsePerformancesProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['performances', artistId],
      queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
        getPerformancesSearch(artistId, pageParam),
      enabled,
      initialPageParam: 1,
      getNextPageParam: (lastPage: GetPerformancesSearchResponse) => {
        return lastPage.nextCursor !== -1 ? lastPage.nextCursor : undefined;
      },
    });

  const performances = data?.pages.flatMap((page) => page.performances) || [];
  const performanceCount = data?.pages[0]?.performanceCount || 0;

  return {
    performances,
    performanceCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export const useSearchRelatedKeyword = ({
  keyword,
  enabled,
}: UseArtistProps) => {
  const { data, isLoading } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTION.SEARCH_RELATED_KEYWORD(keyword, enabled),
  });

  return { data, isLoading };
};
