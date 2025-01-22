import { BaseResponse } from '@shared/types/api';
import { FestivalTimetableResponse } from '@shared/types/festival-timetable-response';
import { END_POINT } from '@shared/constants/api';
import { get, del } from '../config/instance';

export const getFestivalTimetables =
  async (): Promise<FestivalTimetableResponse> => {
    const response = await get<BaseResponse<FestivalTimetableResponse>>(
      END_POINT.GET_FESTIVAL_TIMETABLES,
    );
    return response.data;
  };

export const delFestivalTimetables = async (
  festivalId: number,
): Promise<void> => {
  await del<FestivalTimetableResponse>(
    END_POINT.DEL_FESTIVAL_TIMETABLES(festivalId),
  );
};
