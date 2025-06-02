import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteFestivalTimetables,
  postAddFestivalTimeTable,
} from '@shared/apis/time-table/festival-timetable-mutation';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';

export const useDeleteTimeTableFestival = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (festivalId: number) => deleteFestivalTimetables(festivalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL],
      });
    },
  });
};

export const useAddTimeTableFestival = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedFestivals: number[]) =>
      postAddFestivalTimeTable(selectedFestivals),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL],
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
