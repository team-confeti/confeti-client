export interface TimetableSlot {
  id: string;
  date: string;
  stageIndex: number;
  artistId: number;
  startTime: string;
  endTime: string;
  festivalTimeId?: number;
}

export interface FestivalStageFormData {
  name: string;
  order?: number;
  festivalStageId?: number;
}

export interface FestivalDateMeta {
  date: string;
  openAt?: string;
  festivalDateId?: number;
}

export interface PerformanceArtist {
  id: number;
  name: string;
  artworkUrl?: string;
  festivalDates?: string[];
}

export interface PerformanceFormData {
  type: string;
  title: string;
  startDate: string;
  endDate: string;
  ageRating: string;
  durationMinutes: number;
  bookingSchedules: Array<{ round: string; startDate: string }>;
  selectedTicketingPlatforms: Array<{
    id: number;
    name: string;
    url: string;
    datetime: string;
  }>;
  venueName: string;
  venueAddress: string;
  priceGrades: Array<{ grade: string; price: string }>;
  mainPoster: File | null;
  logo: File | null;
  mainPosterPreview: string | null;
  logoPreview: string | null;
  stages: FestivalStageFormData[];
  artists: PerformanceArtist[];
  artistSearch: string;
  timetableSlots: TimetableSlot[];
  festivalDateMetas: FestivalDateMeta[];
  publishedPerformanceId: number | null;
}

export interface ExistingPerformance {
  type?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  venueName?: string;
  venueAddress?: string;
  ageRating?: string;
  durationMinutes?: number;
  bookingSchedules?: Array<{ round: string; startDate: string }>;
  selectedTicketingPlatforms?: Array<{
    id: number;
    name: string;
    url: string;
    datetime: string;
  }>;
  priceGrades?: Array<{ grade: string; price: string }>;
  mainPosterPreview?: string;
  logoPreview?: string;
  artists?: PerformanceArtist[];
  stages?: FestivalStageFormData[];
  timetableSlots?: TimetableSlot[];
  festivalDateMetas?: FestivalDateMeta[];
  publishedPerformanceId?: number;
}
