import { useMutation } from '@tanstack/react-query';

import {
  deleteCancelEditSetList,
  patchCompleteEditSetList,
  patchReorderSetList,
  postStartEditSetList,
} from '@shared/apis/my-history/setlist-mutation';

export const useStartEditSetList = () => {
  return useMutation({
    mutationFn: (setlistId: number) => postStartEditSetList(setlistId),
  });
};

export const useCompleteEditSetList = () => {
  return useMutation({
    mutationFn: (setlistId: number) => patchCompleteEditSetList(setlistId),
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
      tracks: { trackId: string; orders: number }[];
    }) => patchReorderSetList(setlistId, tracks),
  });
};
