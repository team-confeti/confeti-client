import type { ConcertResponse, FestivalResponse } from '@shared/types/api';

export type PerformanceCardData = {
  title: string;
  subtitle?: string;
  image?: string;
  type: 'Festival' | 'Concert';
  startDate?: string;
  date?: string;
  endDate?: string;
  venueName?: string;
};

export const mapFestivalToCardData = (
  festival: FestivalResponse,
): PerformanceCardData => ({
  title: festival.title,
  subtitle: festival.subtitle,
  image: festival.posterUrl,
  type: 'Festival',
  startDate: festival.startAt,
  endDate: festival.endAt,
  venueName: festival.area,
});

export const mapConcertToCardData = (
  concert: ConcertResponse,
): PerformanceCardData => ({
  title: concert.title,
  subtitle: concert.subtitle,
  image: concert.posterUrl,
  type: 'Concert',
  startDate: concert.startAt,
  endDate: concert.endAt,
  venueName: concert.area,
});
