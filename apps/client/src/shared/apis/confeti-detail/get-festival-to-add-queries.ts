import { infiniteQueryOptions } from '@tanstack/react-query';
import { getFestivalToAdd } from './get-festival-to-add';
import { GetFestivalToAddResponse } from '@shared/types/get-festival-to-add-response';

export const GET_FESTIVAL_TO_ADD_QUERY_KEY = {
  ALL: ['getFestivalToAdd'],
  LIST: () => [...GET_FESTIVAL_TO_ADD_QUERY_KEY.ALL, 'list'],
} as const;

export const GET_FESTIVAL_TO_ADD_QUERY_OPTIONS = {
  LIST: () =>
    infiniteQueryOptions<GetFestivalToAddResponse, Error>({
      queryKey: GET_FESTIVAL_TO_ADD_QUERY_KEY.LIST(),
      queryFn: ({ pageParam }) => getFestivalToAdd(pageParam as number),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }),
};
