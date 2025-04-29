import { useQuery } from '@tanstack/react-query';

import { SETLIST_QUERY_OPTION } from '@shared/apis/my-history/setlist-queries';
import { SetListPerformanceRequest } from '@shared/types/my-history-response';

export const useSearchSetListPerformance = (
  request: SetListPerformanceRequest,
  enabled: boolean,
) => {
  const { data, isLoading } = useQuery({
    ...SETLIST_QUERY_OPTION.SEARCH_PERFORMANCE(request, enabled),
    enabled,
  });

  return { data, isLoading };
};
