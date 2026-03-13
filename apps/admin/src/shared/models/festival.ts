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

const EMPTY_FESTIVAL_GROUP: FestivalGroupResponse = {
  festivals: [],
  count: 0,
};

const EMPTY_FESTIVAL_LIST_RESPONSE: AdminFestivalListResponse = {
  upcomingFestivals: EMPTY_FESTIVAL_GROUP,
  finishedFestivals: EMPTY_FESTIVAL_GROUP,
};

const isFestivalGroup = (value: unknown): value is FestivalGroupResponse =>
  typeof value === 'object' &&
  value !== null &&
  'festivals' in value &&
  Array.isArray(value.festivals) &&
  'count' in value &&
  typeof value.count === 'number';

const hasFestivalGroupObjects = (
  response: AdminFestivalListQueryResponse,
): response is AdminFestivalListResponse =>
  typeof response === 'object' &&
  response !== null &&
  !Array.isArray(response) &&
  'upcomingFestivals' in response &&
  'finishedFestivals' in response &&
  isFestivalGroup(response.upcomingFestivals) &&
  isFestivalGroup(response.finishedFestivals);

const hasFestivalGroupArrays = (
  response: AdminFestivalListQueryResponse,
): response is {
  upcomingFestivals: FestivalResponse[];
  finishedFestivals: FestivalResponse[];
} =>
  typeof response === 'object' &&
  response !== null &&
  !Array.isArray(response) &&
  'upcomingFestivals' in response &&
  'finishedFestivals' in response &&
  Array.isArray(response.upcomingFestivals) &&
  Array.isArray(response.finishedFestivals);

const hasFestivalList = (
  response: AdminFestivalListQueryResponse,
): response is { festivals: AdminFestivalListItemResponse[]; count?: number } =>
  typeof response === 'object' &&
  response !== null &&
  !Array.isArray(response) &&
  'festivals' in response;

const isFinishedPerformance = (status: string | undefined, endAt: string) => {
  const normalizedStatus = status?.toLowerCase();

  if (normalizedStatus === 'completed') {
    return true;
  }

  if (normalizedStatus === 'scheduled') {
    return false;
  }

  return isDatePast(endAt);
};

const createFestivalGroup = (
  festivals: FestivalResponse[],
): FestivalGroupResponse => ({
  festivals,
  count: festivals.length,
});

export const getFestivalGroups = (
  response: AdminFestivalListQueryResponse | null | undefined,
): AdminFestivalListResponse => {
  if (!response) {
    return EMPTY_FESTIVAL_LIST_RESPONSE;
  }

  if (hasFestivalGroupObjects(response)) {
    return response;
  }

  if (hasFestivalGroupArrays(response)) {
    return {
      upcomingFestivals: createFestivalGroup(response.upcomingFestivals),
      finishedFestivals: createFestivalGroup(response.finishedFestivals),
    };
  }

  if (!Array.isArray(response) && !hasFestivalList(response)) {
    return EMPTY_FESTIVAL_LIST_RESPONSE;
  }

  const festivals = Array.isArray(response) ? response : response.festivals;

  if (!festivals.length) {
    return EMPTY_FESTIVAL_LIST_RESPONSE;
  }

  const groupedFestivals = festivals.reduce<{
    upcomingFestivals: FestivalResponse[];
    finishedFestivals: FestivalResponse[];
  }>(
    (result, festival) => {
      if (isFinishedPerformance(festival.status, festival.endAt)) {
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
  const artistMap = new Map<string, { id: number; name: string }>();
  festival.dates?.forEach((date) => {
    date.artists?.forEach((artist) => {
      if (!artistMap.has(artist.artistId)) {
        artistMap.set(artist.artistId, {
          id: Number(artist.artistId),
          name: artist.name,
        });
      }
    });
  });

  return {
    type: 'Festival',
    title: festival.title,
    subtitle: festival.subtitle,
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
    artists: Array.from(artistMap.values()),
  };
};
