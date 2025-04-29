import { useSuspenseQuery } from '@tanstack/react-query';

import { SETLIST_QUERY_OPTION } from '@shared/apis/my-history/setlist-queries';

export const useSetListDetail = (setlistId: number) => {
  const { data } = useSuspenseQuery(SETLIST_QUERY_OPTION.DETAIL(setlistId));

  return { data };
};
