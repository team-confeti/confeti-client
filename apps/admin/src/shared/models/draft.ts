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
};

export const mapDraftDetailToExistingPerformance = (
  draft: DraftDetailResponse,
): ExistingPerformance => {
  let parsed: PerformanceDataJson = {};
  try {
    parsed = JSON.parse(draft.performanceData) as PerformanceDataJson;
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
  };
};
