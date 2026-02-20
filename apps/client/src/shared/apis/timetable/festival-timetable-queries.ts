import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import {
  FestivalTimetableResponseExtended,
  TimeTableCreationHistory,
  TimetableDatesResponse,
} from '@shared/types/festival-timetable-response';
import { GetFestivalToAddResponse } from '@shared/types/get-festival-to-add-response';

export const FESTIVAL_TIMETABLE_QUERY_OPTIONS = {
  ALL: () =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    }),
  ONBOARDING: () =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ONBOARDING(),
      queryFn: getTimeTableCreationHistory,
    }),
  FESTIVAL_TIMETABLE: (timetableId: number, festivalDateId: number) =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.FESTIVAL_TIMETABLE(
        timetableId,
        festivalDateId,
      ),
      queryFn: () => getFestivalTimetable(timetableId, festivalDateId),
      enabled: festivalDateId !== undefined,
    }),
  ADDABLE_FESTIVALS: () =>
    infiniteQueryOptions<GetFestivalToAddResponse, Error>({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ADDABLE_FESTIVALS(),
      queryFn: ({ pageParam }) => getFestivalToAdd(pageParam as number),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }),
  TIMETABLE_DATES: (timetableId: number) =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.TIMETABLE_DATES(timetableId),
      queryFn: () => getTimetableDates(timetableId),
      enabled: timetableId !== undefined,
    }),
};

export const getFestivalTimetable = async (
  timetableId: number,
  festivalDateId: number,
): Promise<FestivalTimetableResponseExtended> => {
  const response = await get<BaseResponse<FestivalTimetableResponseExtended>>(
    END_POINT.GET_FESTIVAL_TIMETABLE(timetableId, festivalDateId),
  );
  return response.data;
};

export const getTimeTableCreationHistory = async () => {
  const response = await get<BaseResponse<TimeTableCreationHistory>>(
    END_POINT.FETCH_TIMETABLE_CREATION_HISTORY,
  );
  return response.data;
};

export const getFestivalToAdd = async (
  cursor?: number,
): Promise<GetFestivalToAddResponse> => {
  const response = await get<BaseResponse<GetFestivalToAddResponse>>(
    END_POINT.GET_FESTIVAL_TO_ADD(cursor),
  );
  return response.data;
};

export const getTimetableDates = async (
  timetableId: number,
): Promise<TimetableDatesResponse> => {
  const response = await get<BaseResponse<TimetableDatesResponse>>(
    END_POINT.GET_TIMETABLE_DATES(timetableId),
  );
  return response.data;
};
