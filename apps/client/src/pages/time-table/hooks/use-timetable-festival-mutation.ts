import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFestivalTimetables } from '@shared/apis/time-table/festival-timetable';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/apis/time-table/festival-timetable-queries';

export const useTimeTableFestivalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (festivalId: number) => deleteFestivalTimetables(festivalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
      });
    },
  });
};
