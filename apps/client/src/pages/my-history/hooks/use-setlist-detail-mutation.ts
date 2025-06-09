import { useMutation } from '@tanstack/react-query';

import {
  deleteCancelEditSetList,
  patchCompleteEditSetList,
  patchReorderSetList,
  postStartEditSetList,
} from '@shared/apis/my-history/setlist-mutation';

export const useStartEditSetList = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (setlistId: number) => postStartEditSetList(setlistId),
    onSuccess: () => {
      onSuccessCallback?.();
    },
  });
};
export const useCompleteEditSetList = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (setlistId: number) => patchCompleteEditSetList(setlistId),
    onSuccess: () => {
      onSuccessCallback?.();
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
