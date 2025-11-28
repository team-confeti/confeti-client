import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_TIMETABLE_QUERY_KEY } from '@shared/constants/query-key';
import {
  FestivalTimetableResponse,
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
  AVAILABLE_FESTIVALS: () =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.AVAILABLE_FESTIVALS(),
      queryFn: getAvailableFestivals,
    }),
  FESTIVAL_TIMETABLE: (festivalId: number) =>
    queryOptions({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.FESTIVAL_TIMETABLE(festivalId),
      queryFn: () => getFestivalTimetable(festivalId),
      enabled: festivalId !== undefined,
    }),
  ADDABLE_FESTIVALS: () =>
    infiniteQueryOptions<GetFestivalToAddResponse, Error>({
      queryKey: FESTIVAL_TIMETABLE_QUERY_KEY.ADDABLE_FESTIVALS(),
      queryFn: ({ pageParam }) => getFestivalToAdd(pageParam as number),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }),
  TIMETABLE_DATES: (timetableFestivalId: number) =>
    queryOptions({
      queryKey:
        FESTIVAL_TIMETABLE_QUERY_KEY.TIMETABLE_DATES(timetableFestivalId),
      queryFn: () => getTimetableDates(timetableFestivalId),
      enabled: timetableFestivalId !== undefined,
    }),
};

export const getAvailableFestivals =
  async (): Promise<FestivalTimetableResponse> => {
    const response = await get<BaseResponse<FestivalTimetableResponse>>(
      END_POINT.GET_AVAILABLE_FESTIVALS,
    );
    return response.data;
  };

export const getFestivalTimetable = async (
  festivalDateId: number,
): Promise<FestivalTimetableResponseExtended> => {
  const response = await get<BaseResponse<FestivalTimetableResponseExtended>>(
    END_POINT.GET_FESTIVAL_TIMETABLE(festivalDateId),
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
  timetableFestivalId: number,
): Promise<TimetableDatesResponse> => {
  const response = await get<BaseResponse<TimetableDatesResponse>>(
    END_POINT.GET_TIMETABLE_DATES(timetableFestivalId),
  );
  return response.data;
};
