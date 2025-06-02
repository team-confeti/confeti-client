import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMusicFromSetList } from '@shared/apis/my-history/setlist-queries';
import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';

export const useDeleteMusicMutation = (setlistId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (orders: number) => deleteMusicFromSetList(setlistId, orders),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: SETLIST_QUERY_KEY.DETAIL(setlistId),
      });
    },
  });

  return mutation;
};
