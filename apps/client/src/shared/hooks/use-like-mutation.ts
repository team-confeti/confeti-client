import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postLikeArtist,
  deleteLikeArtist,
  postLikeFestival,
  deleteLikeFestival,
} from '@shared/apis/like/like';
import { LIKE_QUERY_KEY } from '@shared/apis/like/like-queries';

interface Props {
  id: string | number;
  action: 'LIKE' | 'UNLIKE';
  type: 'ARTIST' | 'FESTIVAL' | 'CONCERT';
}

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action, type }: Props) => {
      switch (type) {
        case 'ARTIST':
          if (action === 'LIKE') {
            await postLikeArtist(String(id));
          } else if (action === 'UNLIKE') {
            await deleteLikeArtist(String(id));
          }
          break;

        case 'FESTIVAL':
          if (action === 'LIKE') {
            await postLikeFestival(Number(id));
          } else if (action === 'UNLIKE') {
            await deleteLikeFestival(Number(id));
          }
          break;

        // case 'CONCERT':
        //   if (action === 'LIKE') {
        //     await postLikeConcert(number(id));
        //   } else if (action === 'UNLIKE') {
        //     await deleteLikeConcert(number(id));
        //   }
        //   break;

        default:
          throw new Error(`Unknown type: ${type}`);
      }
      return { id, type };
    },

    onSuccess: ({ id, type }) => {
      let queryKey;
      switch (type) {
        case 'ARTIST':
          queryKey = LIKE_QUERY_KEY.LIKE_ARTIST(String(id));
          break;

        case 'FESTIVAL':
          queryKey = LIKE_QUERY_KEY.LIKE_FESTIVAL(Number(id));
          break;

        // case 'CONCERT':
        //   queryKey = LIKE_QUERY_KEY.LIKE_CONCERT(id);
        //   break;

        default:
          throw new Error(`Unknown type: ${type}`);
      }

      queryClient.invalidateQueries({ queryKey });
    },
  });
};
