import { mutationOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { TIMETABLE_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  FestivalIds,
  FestivalTimetableResponse,
} from '@shared/types/festival-timetable-response';
import { TimeBlock, TimeBlockResponse } from '@shared/types/timetable-response';

export const TIMETABLE_MUTATION_OPTIONS = {
  POST_TIMETABLE: () =>
    mutationOptions({
      mutationKey: TIMETABLE_MUTATION_KEY.POST_TIMETABLE(),
      mutationFn: (festivals: { festivalId: number }[]) =>
        postAddTimetable(festivals),
    }),
  PATCH_TIMETABLE: () =>
    mutationOptions({
      mutationKey: TIMETABLE_MUTATION_KEY.PATCH_TIMETABLE(),
      mutationFn: (data: { timetableId: number; timeBlocks: TimeBlock[] }) =>
        patchTimetableTimeBlocks(data.timetableId, {
          timeBlocks: data.timeBlocks,
        }),
    }),
};

export const patchTimetableTimeBlocks = async (
  timetableId: number,
  requestData: TimeBlockResponse,
): Promise<void> => {
  await patch<BaseResponse<FestivalTimetableResponse>>(
    END_POINT.PATCH_TIMETABLE_TIME_BLOCKS(timetableId),
    requestData,
  );
};

export const postAddTimetable = async (
  festivals: { festivalId: number }[],
): Promise<void> => {
  await post<BaseResponse<FestivalIds>>(END_POINT.POST_TIMETABLE, {
    festivals,
  });
};
