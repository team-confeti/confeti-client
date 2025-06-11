import { useMutation } from '@tanstack/react-query';

import {
  deleteCancelEditSetList,
  patchCompleteEditSetList,
  patchReorderSetList,
  postStartEditSetList,
} from '@shared/apis/my-history/setlist-mutation';

export const useStartEditSetList = (options?: {
  onMutate?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (setlistId: number) => postStartEditSetList(setlistId),
    onMutate: () => {
      options?.onMutate?.();
    },
    onError: () => {
      options?.onError?.();
    },
  });
};

export const useCompleteEditSetList = (options?: {
  onMutate?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (setlistId: number) => patchCompleteEditSetList(setlistId),
    onMutate: () => {
      options?.onMutate?.();
    },
    onError: () => {
      options?.onError?.();
    },
  });
};

export const useCancelEditSetList = () => {
  return useMutation({
    mutationFn: (setlistId: number) => deleteCancelEditSetList(setlistId),
  });
};

export const useReorderSetList = () => {
  return useMutation({
    mutationFn: ({
      setlistId,
      tracks,
    }: {
      setlistId: number;
      tracks: { musicId: string; orders: number }[];
    }) => patchReorderSetList(setlistId, tracks),
  });
};
