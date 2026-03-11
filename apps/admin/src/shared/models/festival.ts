import type { AdminFestivalDetailResponse } from '@shared/types/api';

import type { ExistingPerformance } from '@pages/performance-editor/types';

export const mapFestivalDetailToExistingPerformance = (
  festival: AdminFestivalDetailResponse,
): ExistingPerformance => ({
  type: 'Festival',
  title: festival.title,
  subtitle: festival.subtitle,
  startDate: festival.startAt,
  endDate: festival.endAt,
  venueName: festival.area,
  venueAddress: festival.address,
});
