import { FESTIVAL_BUTTON_QUERY_KEY } from '@shared/apis/time-table/festival-button-queries';
import { patchFestivalTimetable } from '@shared/apis/time-table/festival-timetable';
import { UserTimetable } from '@shared/types/timetable-response';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchTimeTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserTimetable[]>({
    mutationFn: (userTimetables) => {
      // 여기서 userTimetables 데이터를 콘솔로 찍기
      console.log('UserTimetables:', userTimetables);

      // patchFestivalTimetable 호출
      return patchFestivalTimetable({ userTimetables });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...FESTIVAL_BUTTON_QUERY_KEY.ALL],
      });
    },
  });
};
