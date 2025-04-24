import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchRefreshMusic } from '@shared/apis/home/home';
import { HOME_QUERY_KEY } from '@shared/apis/home/home-queries';
import { MusicList } from '@shared/types/home-response';

export const useRefreshMusic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      performanceId,
      musicList,
    }: {
      performanceId: number;
      musicList: MusicList[];
    }) => {
      return patchRefreshMusic(performanceId, musicList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...HOME_QUERY_KEY.SUGGEST_MUSIC()],
      });
    },
  });
};
