export interface TimetableSlot {
  id: string;
  date: string;
  stageIndex: number;
  artistId: number;
  startTime: string;
  endTime: string;
}

export interface EventFormData {
  type: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  ageRating: string;
  durationMinutes: number;
  bookingSchedules: Array<{ round: string; startDate: string }>;
  selectedAgencies: Array<{
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
  stages: Array<{ name: string }>;
  artists: Array<{ id: number; name: string }>;
  artistSearch: string;
  timetableSlots: TimetableSlot[];
}

export interface ExistingEvent {
  type?: string;
  title?: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  venueName?: string;
  venueAddress?: string;
}
