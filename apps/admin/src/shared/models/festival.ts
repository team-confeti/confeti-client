import type { AdminFestivalDetailResponse } from '@shared/types/api';
import type {
  AdminFestivalListItemResponse,
  AdminFestivalListQueryResponse,
  AdminFestivalListResponse,
  FestivalGroupResponse,
  FestivalResponse,
} from '@shared/types/api';
import { isDatePast } from '@shared/utils/format-date';

import type { ExistingPerformance } from '@pages/performance-editor/types';

const parseDurationMinutes = (time: string): number => {
  const match = time.match(/(\d+)/);
  return match ? Number(match[1]) : 120;
};

const parsePriceGrades = (
  price: string,
): Array<{ grade: string; price: string }> => {
  if (!price) return [];
  return price
    .split(' / ')
    .map((p) => {
      const trimmed = p.trim();
      const lastSpace = trimmed.lastIndexOf(' ');
      if (lastSpace === -1) return { grade: trimmed, price: '' };
      return {
        grade: trimmed.slice(0, lastSpace),
        price: trimmed.slice(lastSpace + 1),
      };
    })
    .filter((g) => g.grade);
};

const extractDate = (value: string) => value.split('T')[0] ?? value;

const extractTime = (value: string) =>
  value.split('T')[1]?.slice(0, 5) ?? value;

const EMPTY_FESTIVAL_GROUP: FestivalGroupResponse = {
  festivals: [],
  count: 0,
};

const EMPTY_FESTIVAL_LIST_RESPONSE: AdminFestivalListResponse = {
  upcomingFestivals: EMPTY_FESTIVAL_GROUP,
  finishedFestivals: EMPTY_FESTIVAL_GROUP,
};

const matchesFestivalGroup = (
  value: unknown,
): value is { festivals: FestivalResponse[]; count?: number } =>
  typeof value === 'object' &&
  value !== null &&
  'festivals' in value &&
  Array.isArray(value.festivals);

const matchesFestivalGroupObjectResponse = (
  response: unknown,
): response is AdminFestivalListResponse =>
  typeof response === 'object' &&
  response !== null &&
  'upcomingFestivals' in response &&
  'finishedFestivals' in response &&
  matchesFestivalGroup(response.upcomingFestivals) &&
  matchesFestivalGroup(response.finishedFestivals);

const matchesFestivalGroupArrayResponse = (
  response: unknown,
): response is {
  upcomingFestivals: FestivalResponse[];
  finishedFestivals: FestivalResponse[];
} =>
  typeof response === 'object' &&
  response !== null &&
  'upcomingFestivals' in response &&
  'finishedFestivals' in response &&
  Array.isArray(response.upcomingFestivals) &&
  Array.isArray(response.finishedFestivals);

const matchesFlatFestivalListResponse = (
  response: unknown,
): response is {
  festivals: AdminFestivalListItemResponse[];
  count?: number;
} =>
  typeof response === 'object' &&
  response !== null &&
  'festivals' in response &&
  Array.isArray(response.festivals);

const createFestivalGroup = (
  festivals: FestivalResponse[],
): FestivalGroupResponse => ({
  festivals,
  count: festivals.length,
});

const showFinishedPerformance = (status: string | undefined, endAt: string) => {
  const normalizedStatus = status?.toLowerCase();

  if (normalizedStatus === 'completed') {
    return true;
  }

  if (normalizedStatus === 'scheduled') {
    return false;
  }

  return isDatePast(endAt);
};

export const getFestivalGroups = (
  response: AdminFestivalListQueryResponse | null | undefined | unknown,
): AdminFestivalListResponse => {
  if (!response) {
    return EMPTY_FESTIVAL_LIST_RESPONSE;
  }

  if (matchesFestivalGroupObjectResponse(response)) {
    return {
      upcomingFestivals: createFestivalGroup(
        response.upcomingFestivals.festivals,
      ),
      finishedFestivals: createFestivalGroup(
        response.finishedFestivals.festivals,
      ),
    };
  }

  if (matchesFestivalGroupArrayResponse(response)) {
    return {
      upcomingFestivals: createFestivalGroup(response.upcomingFestivals),
      finishedFestivals: createFestivalGroup(response.finishedFestivals),
    };
  }

  const festivals = Array.isArray(response)
    ? response
    : matchesFlatFestivalListResponse(response)
      ? response.festivals
      : [];

  if (festivals.length === 0) {
    return EMPTY_FESTIVAL_LIST_RESPONSE;
  }

  const groupedFestivals = festivals.reduce<{
    upcomingFestivals: FestivalResponse[];
    finishedFestivals: FestivalResponse[];
  }>(
    (result, festival) => {
      if (showFinishedPerformance(festival.status, festival.endAt)) {
        result.finishedFestivals.push(festival);
        return result;
      }

      result.upcomingFestivals.push(festival);
      return result;
    },
    {
      upcomingFestivals: [],
      finishedFestivals: [],
    },
  );

  return {
    upcomingFestivals: createFestivalGroup(groupedFestivals.upcomingFestivals),
    finishedFestivals: createFestivalGroup(groupedFestivals.finishedFestivals),
  };
};

export const mapFestivalDetailToExistingPerformance = (
  festival: AdminFestivalDetailResponse,
): ExistingPerformance => {
  const artistMap = new Map<
    string,
    { id: number; name: string; artworkUrl?: string }
  >();
  const stagesById = new Map<
    string,
    { name: string; order?: number; festivalStageId?: number }
  >();

  festival.dates?.forEach((date) => {
    date.artists?.forEach((artist) => {
      if (!artistMap.has(artist.artistId)) {
        artistMap.set(artist.artistId, {
          id: Number(artist.artistId),
          name: artist.name,
          artworkUrl: artist.artworkUrl || undefined,
        });
      }
    });

    date.stages?.forEach((stage) => {
      const stageKey = String(stage.festivalStageId);

      if (!stagesById.has(stageKey)) {
        stagesById.set(stageKey, {
          name: stage.name,
          order: stage.order,
          festivalStageId: stage.festivalStageId,
        });
      }
    });
  });

  const stages = Array.from(stagesById.values()).sort(
    (left, right) => (left.order ?? 0) - (right.order ?? 0),
  );
  const stageIndexById = new Map<number, number>();
  stages.forEach((stage, index) => {
    if (stage.festivalStageId !== undefined) {
      stageIndexById.set(stage.festivalStageId, index);
    }
  });

  return {
    type: 'Festival',
    title: festival.title,
    startDate: festival.startAt,
    endDate: festival.endAt,
    venueName: festival.area,
    venueAddress: festival.address,
    ageRating: festival.ageRating,
    durationMinutes: parseDurationMinutes(festival.time),
    bookingSchedules: festival.reserveAt
      ? [{ round: '1차', startDate: festival.reserveAt }]
      : [],
    priceGrades: parsePriceGrades(festival.price),
    mainPosterPreview: festival.posterUrl || undefined,
    logoPreview: festival.logoUrl || undefined,
    publishedPerformanceId: festival.festivalId,
    selectedTicketingPlatforms: [],
    artists: Array.from(artistMap.values()),
    stages,
    festivalDateMetas:
      festival.dates?.map((date) => ({
        date: extractDate(date.festivalAt),
        openAt: extractTime(date.openAt),
        festivalDateId: date.festivalDateId,
      })) ?? [],
    timetableSlots:
      festival.dates?.flatMap((date) =>
        date.stages.flatMap((stage) =>
          stage.times
            .map((time) => {
              const artist = time.artists[0];

              if (!artist) {
                return null;
              }

              return {
                id: `slot-${time.festivalTimeId}`,
                date: extractDate(date.festivalAt),
                stageIndex: stageIndexById.get(stage.festivalStageId) ?? 0,
                artistId: Number(artist.artistId),
                startTime: extractTime(time.startAt),
                endTime: extractTime(time.endAt),
                festivalTimeId: time.festivalTimeId,
              };
            })
            .filter((timeSlot) => timeSlot !== null),
        ),
      ) ?? [],
  };
};
