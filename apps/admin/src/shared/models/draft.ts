import type {
  DraftDetailResponse,
  DraftListItem,
  DraftListQueryResponse,
  PerformanceDraftType,
} from '@shared/types/api';

import type { ExistingPerformance } from '@pages/performance-editor/types';

type PerformanceDataJson = {
  type?: string;
  title?: string;
  name?: string;
  performanceName?: string;
  performanceTitle?: string;
  concertName?: string;
  festivalName?: string;
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
  artists?: Array<{ id: number; name: string; artworkUrl?: string }>;
  selectedTicketingPlatforms?: Array<{
    id: number;
    name: string;
    url: string;
    datetime: string;
  }>;
  stages?: Array<{
    name: string;
    order?: number;
    festivalStageId?: number;
  }>;
  timetableSlots?: Array<{
    id: string;
    date: string;
    stageIndex: number;
    artistId: number;
    startTime: string;
    endTime: string;
    festivalTimeId?: number;
  }>;
  festivalDateMetas?: Array<{
    date: string;
    openAt?: string;
    festivalDateId?: number;
  }>;
  publishedPerformanceId?: number | null;
};

type DraftPerformanceTypeMeta = {
  color: string;
  label: string;
  symbol: string;
};

const DRAFT_PERFORMANCE_TYPE_META: Record<
  PerformanceDraftType,
  DraftPerformanceTypeMeta
> = {
  FESTIVAL: {
    color: '#AD46FF',
    label: '페스티벌',
    symbol: 'F',
  },
  CONCERT: {
    color: '#00BC7D',
    label: '콘서트',
    symbol: 'C',
  },
};

const parseDurationMinutes = (time?: string): number | undefined => {
  if (!time) return undefined;
  const match = time.match(/(\d+)/);
  return match ? Number(match[1]) : undefined;
};

export const getDraftItems = (
  draftListResponse: DraftListQueryResponse | null | undefined,
): DraftListItem[] =>
  Array.isArray(draftListResponse)
    ? draftListResponse
    : (draftListResponse?.drafts ?? []);

export const getDraftPerformanceTypeMeta = (
  performanceType: PerformanceDraftType,
): DraftPerformanceTypeMeta => DRAFT_PERFORMANCE_TYPE_META[performanceType];

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

  const draftArtworkUrlByArtistId = new Map(
    (draft.artists ?? []).map((artist) => [
      Number(artist.artistId),
      artist.artworkUrl || undefined,
    ]),
  );
  const artists =
    (
      parsed.artists ??
      draft.artists?.map((artist) => ({
        id: Number(artist.artistId),
        name: artist.name,
        artworkUrl: artist.artworkUrl || undefined,
      }))
    )?.map((artist) => ({
      ...artist,
      artworkUrl:
        artist.artworkUrl ?? draftArtworkUrlByArtistId.get(Number(artist.id)),
    })) ?? [];
  const title =
    parsed.title ??
    parsed.name ??
    parsed.performanceName ??
    parsed.performanceTitle ??
    parsed.concertName ??
    parsed.festivalName ??
    draft.title;

  return {
    type:
      parsed.type ??
      (draft.performanceType === 'FESTIVAL' ? 'Festival' : 'Concert'),
    title,
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
    artists,
    selectedTicketingPlatforms: parsed.selectedTicketingPlatforms,
    stages: parsed.stages,
    timetableSlots: parsed.timetableSlots,
    festivalDateMetas: parsed.festivalDateMetas,
    publishedPerformanceId: parsed.publishedPerformanceId ?? undefined,
  };
};
