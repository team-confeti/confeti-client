import type { AdminConcertDetailResponse } from '@shared/types/api';

import type { ExistingPerformance } from '@pages/performance-editor/types';

export const mapConcertDetailToExistingPerformance = (
  concert: AdminConcertDetailResponse,
): ExistingPerformance => ({
  type: 'Concert',
  title: concert.title,
  subtitle: concert.subtitle,
  startDate: concert.startAt,
  endDate: concert.endAt,
  venueName: concert.area,
  venueAddress: concert.address,
});
