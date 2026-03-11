import type { AdminFestivalDetailResponse } from '@shared/types/api';

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
