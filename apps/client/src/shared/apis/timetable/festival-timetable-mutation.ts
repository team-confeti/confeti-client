import { BaseResponse } from '@confeti/core/http';

import { del, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import {
  FestivalIds,
  FestivalTimetableResponse,
} from '@shared/types/festival-timetable-response';
import { UserTimetableResponse } from '@shared/types/timetable-response';

export const deleteFestivalTimetables = async (
  festivalId: number,
): Promise<void> => {
  await del<FestivalTimetableResponse>(
    END_POINT.DEL_FESTIVAL_TIMETABLES(festivalId),
  );
};

export const patchFestivalTimetable = async (
  requestData: UserTimetableResponse,
): Promise<void> => {
  await patch<BaseResponse<FestivalTimetableResponse>>(
    END_POINT.GET_AVAILABLE_FESTIVALS,
    requestData,
  );
};

export const postAddFestivalTimetable = async (
  selectedFestivals: number[],
): Promise<void> => {
  const festivals = selectedFestivals.map((festivalId) => ({
    festivalId,
  }));

  await post<BaseResponse<FestivalIds>>(END_POINT.POST_FESTIVAL_TIMETABLE, {
    festivals,
  });
};
