import { BaseResponse } from '@shared/types/api';
import { FestivalTimetableResponseExtended } from '@shared/types/festival-timetable-response';
import { END_POINT } from '@shared/constants/api';
import { get, del } from '../config/instance';
import { get, del } from '../config/instance';

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
