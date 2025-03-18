import { useInfiniteQuery } from '@tanstack/react-query';

import { GET_FESTIVAL_TO_ADD_QUERY_OPTIONS } from '@shared/apis/confeti-detail/get-festival-to-add-queries';

export const useGetFestivalToAdd = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...GET_FESTIVAL_TO_ADD_QUERY_OPTIONS.LIST(),
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
