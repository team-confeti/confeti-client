import type { DraftDetailResponse } from '@shared/types/api';

import type { ExistingPerformance } from '@pages/performance-editor/types';

type PerformanceDataJson = {
  type?: string;
  title?: string;
  subtitle?: string;
  startDate?: string;
  startAt?: string;
  endDate?: string;
  endAt?: string;
  venueName?: string;
  area?: string;
  venueAddress?: string;
  address?: string;
  ageRating?: string;
  durationMinutes?: number;
  time?: string;
  price?: string;
  bookingSchedules?: Array<{ round: string; startDate: string }>;
  priceGrades?: Array<{ grade: string; price: string }>;
  artists?: Array<{ id: number; name: string }>;
  selectedTicketingPlatforms?: Array<{
    id: number;
    name: string;
    url: string;
    datetime: string;
  }>;
};

const parseDurationMinutes = (time?: string): number | undefined => {
  if (!time) return undefined;
  const match = time.match(/(\d+)/);
  return match ? Number(match[1]) : undefined;
};

export const mapDraftDetailToExistingPerformance = (
  draft: DraftDetailResponse,
): ExistingPerformance => {
  let parsed: PerformanceDataJson = {};
  try {
    const result = JSON.parse(draft.performanceData);
    if (result && typeof result === 'object') {
      parsed = result as PerformanceDataJson;
    }
  } catch {
    // performanceData might be empty or malformed
  }
  return {
    type:
      parsed.type ??
      (draft.performanceType === 'FESTIVAL' ? 'Festival' : 'Concert'),
    title: parsed.title,
    subtitle: parsed.subtitle,
    startDate: parsed.startDate ?? parsed.startAt,
    endDate: parsed.endDate ?? parsed.endAt,
    venueName: parsed.venueName ?? parsed.area,
    venueAddress: parsed.venueAddress ?? parsed.address,
    ageRating: parsed.ageRating,
    durationMinutes:
      parsed.durationMinutes ?? parseDurationMinutes(parsed.time),
    bookingSchedules: parsed.bookingSchedules,
    priceGrades: parsed.priceGrades,
    mainPosterPreview: draft.posterUrl || undefined,
    logoPreview: draft.logoUrl || undefined,
    artists:
      parsed.artists ??
      draft.artists?.map((a) => ({
        id: Number(a.artistId),
        name: a.name,
      })),
    selectedTicketingPlatforms: parsed.selectedTicketingPlatforms,
  };
};
