import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteLikeArtist,
  deleteLikeConcert,
  deleteLikeFestival,
  postLikeArtist,
  postLikeConcert,
  postLikeFestival,
} from '@shared/apis/like/like-mutation';
import {
  LIKE_QUERY_KEY,
  PERFORMANCE_QUERY_KEY,
  SEARCH_ARTIST_QUERY_KEY,
} from '@shared/constants/query-key';

type LikeType = 'ARTIST' | 'FESTIVAL' | 'CONCERT';

interface Props {
  id: string | number;
  action: 'LIKE' | 'UNLIKE';
  type: LikeType;
}

interface LikeData {
  likeCount: number;
  isLiked: boolean;
}

const getQueryKey = (type: LikeType, id: string | number) => {
  switch (type) {
    case 'ARTIST':
      return LIKE_QUERY_KEY.LIKE_ARTIST(String(id));
    case 'FESTIVAL':
      return LIKE_QUERY_KEY.LIKE_FESTIVAL(Number(id));
    case 'CONCERT':
      return LIKE_QUERY_KEY.LIKE_CONCERT(Number(id));
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const getInvalidateKey = (type: LikeType, id: string | number) => {
  switch (type) {
    case 'ARTIST':
      return SEARCH_ARTIST_QUERY_KEY.SEARCH_ARTIST('');
    case 'FESTIVAL':
      return PERFORMANCE_QUERY_KEY.FESTIVAL(Number(id));
    case 'CONCERT':
      return PERFORMANCE_QUERY_KEY.CONCERT(Number(id));
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action, type: originalType }: Props) => {
      const type = originalType.toUpperCase() as LikeType;

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

        case 'CONCERT':
          if (action === 'LIKE') {
            await postLikeConcert(Number(id));
          } else if (action === 'UNLIKE') {
            await deleteLikeConcert(Number(id));
          }
          break;

        default:
          throw new Error(`Unknown type: ${type}`);
      }
      return { id, type };
    },

    onMutate: async ({ id, action, type: originalType }) => {
      const type = originalType.toUpperCase() as LikeType;
      const queryKey = getQueryKey(type, id);
      await queryClient.cancelQueries({ queryKey });
      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prev: LikeData) => {
        if (!prev) {
          return {
            likeCount: action === 'LIKE' ? 1 : 0,
            isLiked: action === 'LIKE',
          };
        }
        return {
          ...prev,
          likeCount:
            action === 'LIKE' ? prev.likeCount + 1 : prev.likeCount - 1,
          isLiked: action === 'LIKE',
        };
      });

      return { queryKey, prevData };
    },

    onError: (_err, _variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(context.queryKey, context.prevData);
      }
    },

    onSettled: (_, __, { id, type: originalType }) => {
      const type = originalType.toUpperCase() as LikeType;
      const invalidateKey = getInvalidateKey(type, id);
      if (type === 'ARTIST') {
        queryClient.invalidateQueries({
          queryKey: SEARCH_ARTIST_QUERY_KEY.ALL,
          exact: false,
        });
      } else {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
};
