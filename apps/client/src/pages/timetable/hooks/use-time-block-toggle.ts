import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TIMETABLE_MUTATION_OPTIONS } from '@shared/apis/timetable/festival-timetable-mutations';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import { FestivalTimetableResponseExtended } from '@shared/types/festival-timetable-response';

import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';

interface UseTimeBlockToggleParams {
  timetableId: number;
  festivalDateId: number;
}

export const useTimeBlockToggle = ({
  timetableId,
  festivalDateId,
}: UseTimeBlockToggleParams) => {
  const queryClient = useQueryClient();
  const [pendingChanges, setPendingChanges] = useState(
    () => new Map<number, boolean>(),
  );

  const { mutateAsync, isPending: isSaving } = useMutation(
    TIMETABLE_MUTATION_OPTIONS.PATCH_TIMETABLE(),
  );

  const toggleBlock = (timeBlockId: number, isSelected: boolean) => {
    setPendingChanges((prev) => new Map(prev).set(timeBlockId, isSelected));
  };

  const saveChanges = async (timetableInfo: TimetableInfo) => {
    if (pendingChanges.size === 0) return;

    const timeBlocks = timetableInfo.stages.flatMap((stage) =>
      stage.festivalTimes.map((ft) => ({
        timeBlockId: ft.timeBlockId,
        isSelected: pendingChanges.get(ft.timeBlockId) ?? ft.isSelected,
      })),
    );

    await mutateAsync({ timetableId, timeBlocks });

    queryClient.setQueryData<FestivalTimetableResponseExtended>(
      FESTIVAL_TIMETABLE_QUERY_KEY.FESTIVAL_TIMETABLE(
        timetableId,
        festivalDateId,
      ),
      (old) => {
        if (!old) return old;
        const updatedStages = old.stages.map((stage) => ({
          ...stage,
          festivalTimes: stage.festivalTimes.map((ft) => ({
            ...ft,
            isSelected: pendingChanges.get(ft.timeBlockId) ?? ft.isSelected,
          })),
        }));
        return {
          ...old,
          stages: updatedStages,
          data: { ...old.data, stages: updatedStages },
        };
      },
    );

    setPendingChanges(new Map());
    queryClient.invalidateQueries({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.FESTIVAL_TIMETABLE(
        timetableId,
        festivalDateId,
      ),
    });
  };

  const resetChanges = () => setPendingChanges(new Map());

  const getIsSelected = (timeBlockId: number, serverIsSelected: boolean) =>
    pendingChanges.get(timeBlockId) ?? serverIsSelected;

  return {
    toggleBlock,
    saveChanges,
    resetChanges,
    getIsSelected,
    hasPendingChanges: pendingChanges.size > 0,
    isSaving,
  };
};
