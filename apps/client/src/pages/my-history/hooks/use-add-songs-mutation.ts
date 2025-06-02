import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAddMusicToSetList } from '@shared/apis/my-history/setlist';
import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';
import { AddMusicToSetListRequest } from '@shared/types/my-history-response';

export const useAddSongsMutation = (setlistId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (musics: AddMusicToSetListRequest[]) =>
      postAddMusicToSetList(setlistId, musics),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...SETLIST_QUERY_KEY.ALL],
      });
    },
  });

  return mutation;
};
