import type {
  AdminConcertDetailResponse,
  AdminConcertListItemResponse,
  AdminConcertListQueryResponse,
  AdminConcertListResponse,
  ConcertGroupResponse,
  ConcertResponse,
  TicketVendorResponse,
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

const EMPTY_CONCERT_GROUP: ConcertGroupResponse = {
  concerts: [],
  count: 0,
};

const EMPTY_CONCERT_LIST_RESPONSE: AdminConcertListResponse = {
  upcomingConcerts: EMPTY_CONCERT_GROUP,
  finishedConcerts: EMPTY_CONCERT_GROUP,
};

const matchesConcertGroup = (
  value: unknown,
): value is { concerts: ConcertResponse[]; count?: number } =>
  typeof value === 'object' &&
  value !== null &&
  'concerts' in value &&
  Array.isArray(value.concerts);

const matchesConcertGroupObjectResponse = (
  response: unknown,
): response is AdminConcertListResponse =>
  typeof response === 'object' &&
  response !== null &&
  'upcomingConcerts' in response &&
  'finishedConcerts' in response &&
  matchesConcertGroup(response.upcomingConcerts) &&
  matchesConcertGroup(response.finishedConcerts);

const matchesConcertGroupArrayResponse = (
  response: unknown,
): response is {
  upcomingConcerts: ConcertResponse[];
  finishedConcerts: ConcertResponse[];
} =>
  typeof response === 'object' &&
  response !== null &&
  'upcomingConcerts' in response &&
  'finishedConcerts' in response &&
  Array.isArray(response.upcomingConcerts) &&
  Array.isArray(response.finishedConcerts);

const matchesFlatConcertListResponse = (
  response: unknown,
): response is {
  concerts: AdminConcertListItemResponse[];
  count?: number;
} =>
  typeof response === 'object' &&
  response !== null &&
  'concerts' in response &&
  Array.isArray(response.concerts);

const createConcertGroup = (
  concerts: ConcertResponse[],
): ConcertGroupResponse => ({
  concerts,
  count: concerts.length,
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

export const getConcertGroups = (
  response: AdminConcertListQueryResponse | null | undefined | unknown,
): AdminConcertListResponse => {
  if (!response) {
    return EMPTY_CONCERT_LIST_RESPONSE;
  }

  if (matchesConcertGroupObjectResponse(response)) {
    return {
      upcomingConcerts: createConcertGroup(response.upcomingConcerts.concerts),
      finishedConcerts: createConcertGroup(response.finishedConcerts.concerts),
    };
  }

  if (matchesConcertGroupArrayResponse(response)) {
    return {
      upcomingConcerts: createConcertGroup(response.upcomingConcerts),
      finishedConcerts: createConcertGroup(response.finishedConcerts),
    };
  }

  const concerts = Array.isArray(response)
    ? response
    : matchesFlatConcertListResponse(response)
      ? response.concerts
      : [];

  if (concerts.length === 0) {
    return EMPTY_CONCERT_LIST_RESPONSE;
  }

  const groupedConcerts = concerts.reduce<{
    upcomingConcerts: ConcertResponse[];
    finishedConcerts: ConcertResponse[];
  }>(
    (result, concert) => {
      if (showFinishedPerformance(concert.status, concert.endAt)) {
        result.finishedConcerts.push(concert);
        return result;
      }

      result.upcomingConcerts.push(concert);
      return result;
    },
    {
      upcomingConcerts: [],
      finishedConcerts: [],
    },
  );

  return {
    upcomingConcerts: createConcertGroup(groupedConcerts.upcomingConcerts),
    finishedConcerts: createConcertGroup(groupedConcerts.finishedConcerts),
  };
};

export const mapConcertDetailToExistingPerformance = (
  concert: AdminConcertDetailResponse,
  ticketVendors?: TicketVendorResponse[],
): ExistingPerformance => ({
  type: 'Concert',
  title: concert.title,
  subtitle: concert.subtitle,
  startDate: concert.startAt,
  endDate: concert.endAt,
  venueName: concert.area,
  venueAddress: concert.address,
  ageRating: concert.ageRating,
  durationMinutes: parseDurationMinutes(concert.time),
  bookingSchedules: concert.reserveAt
    ? [{ round: '1차', startDate: concert.reserveAt }]
    : [],
  priceGrades: parsePriceGrades(concert.price),
  mainPosterPreview: concert.posterUrl || undefined,
  publishedPerformanceId: concert.concertId,
  selectedTicketingPlatforms:
    concert.reservationUrls?.map((r) => {
      const vendor = ticketVendors?.find((v) => v.id === r.ticketVendorId);
      return {
        id: r.ticketVendorId,
        name: vendor?.name ?? '',
        url: r.reservationUrl,
        datetime: '',
      };
    }) ?? [],
  artists:
    concert.artists?.map((a) => ({
      id: Number(a.artistId),
      name: a.name,
    })) ?? [],
});
