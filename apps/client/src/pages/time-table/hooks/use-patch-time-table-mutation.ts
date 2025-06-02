import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchFestivalTimetable } from '@shared/apis/time-table/festival-timetable';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { UserTimetable } from '@shared/types/timetable-response';

export const usePatchTimeTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserTimetable[]>({
    mutationFn: (userTimetables) => {
      return patchFestivalTimetable({ userTimetables });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL],
      });
    },
  });
};
