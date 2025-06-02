import { queryOptions } from '@tanstack/react-query';

import { get, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_BUTTON_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import {
  FestivalIds,
  FestivalTimetableResponse,
} from '@shared/types/festival-timetable-response';

export const FESTIVAL_BUTTON_QUERY_OPTIONS = {
  FESTIVAL_BUTTON: () =>
    queryOptions({
      queryKey: FESTIVAL_BUTTON_QUERY_KEY.ALL,
      queryFn: getFestivalButton,
    }),
};

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
