import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  FestivalIds,
  FestivalTimetableResponse,
} from '@shared/types/festival-timetable-response';

import { get, post } from '../config/instance';

export const getFestivalButton =
  async (): Promise<FestivalTimetableResponse> => {
    const response = await get<BaseResponse<FestivalTimetableResponse>>(
      END_POINT.GET_FESTIVAL_BUTTON,
    );
    return response.data;
  };

export const addFestivalTimeTable = async (
  selectedFestivals: number[],
): Promise<void> => {
  const festivals = selectedFestivals.map((festivalId) => ({
    festivalId,
  }));

  await post<BaseResponse<FestivalIds>>(END_POINT.POST_FESTIVAL_TIMETABLE, {
    festivals,
  });
};
