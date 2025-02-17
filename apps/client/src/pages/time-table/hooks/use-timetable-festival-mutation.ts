import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFestivalTimetables } from '@shared/apis/time-table/festival-timetable';
import { addFestivalTimeTable } from '@shared/apis/time-table/festival-button';
import { FESTIVAL_BUTTON_QUERY_KEY } from '@shared/apis/time-table/festival-button-queries';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/apis/time-table/festival-timetable-queries';

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
