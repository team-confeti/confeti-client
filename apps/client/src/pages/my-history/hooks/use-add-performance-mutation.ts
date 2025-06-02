import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAddPerformanceToSetList } from '@shared/apis/my-history/setlist';
import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';
import { SetListPerformance } from '@shared/types/my-history-response';

export const useAddPerformanceMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (items: Pick<SetListPerformance, 'type' | 'typeId'>[]) =>
      postAddPerformanceToSetList(items),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...SETLIST_QUERY_KEY.ALL],
      });
    },
  });
  return mutation;
};
