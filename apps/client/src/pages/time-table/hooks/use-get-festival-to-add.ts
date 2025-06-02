import { useInfiniteQuery } from '@tanstack/react-query';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';

export const useGetFestivalToAdd = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...PERFORMANCE_QUERY_OPTIONS.GET_FESTIVAL_TO_ADD_LIST(),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor === -1 ? undefined : lastPage.nextCursor;
    },
  });

  const festivals = data?.pages.flatMap((page) => page.festivals) ?? [];

  return {
    festivals,
    fetchNextPage,
    hasNextPage,
  };
};
