import type {
  AdminConcertDetailResponse,
  TicketVendorResponse,
} from '@shared/types/api';

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
