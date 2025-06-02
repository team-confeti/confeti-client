import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addFestivalTimeTable } from '@shared/apis/time-table/festival-button-queries';
import { deleteFestivalTimetables } from '@shared/apis/time-table/festival-timetable-queries';
import {
  FESTIVAL_BUTTON_QUERY_KEY,
  FESTIVAL_TIMETABLE_QUERY_KEY,
} from '@shared/constants/query-key';

export const useDeleteTimeTableFestival = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (festivalId: number) => deleteFestivalTimetables(festivalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...FESTIVAL_BUTTON_QUERY_KEY.ALL,
          ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
        ],
      });
    },
  });
};

export const useAddTimeTableFestival = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedFestivals: number[]) =>
      addFestivalTimeTable(selectedFestivals),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_BUTTON_QUERY_KEY.ALL],
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
