import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  FestivalTimetableResponse,
  FestivalTimetableResponseExtended,
  TimeTableCreationHistory,
} from '@shared/types/festival-timetable-response';
import { UserTimetableResponse } from '@shared/types/timetable-response';

import { del, get, patch } from '../config/instance';

export const getFestivalTimetable = async (
  festivalDateId: number,
): Promise<FestivalTimetableResponseExtended> => {
  const response = await get<BaseResponse<FestivalTimetableResponseExtended>>(
    END_POINT.GET_FESTIVAL_TIMETABLE(festivalDateId),
  );
  return response.data;
};

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
    END_POINT.GET_FESTIVAL_BUTTON,
    requestData,
  );
};

export const getTimeTableCreationHistory = async () => {
  const response = await get<BaseResponse<TimeTableCreationHistory>>(
    END_POINT.FETCH_TIMETABLE_CREATION_HISTORY,
  );
  return response.data;
};
