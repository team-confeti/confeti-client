import type { Artist } from './artist';
import type { BookingLink, BookingSchedule, PriceInfo, Stage } from './common';
import type { TimetableSlot } from './timetable';

export type PerformanceType = 'Festival' | 'Concert';

export type PerformanceStatus =
  | 'Pending'
  | 'Published'
  | 'Draft'
  | 'Scheduled'
  | 'Completed';

export interface PerformanceItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  startDate: string;
  endDate: string;
  status: PerformanceStatus;
  type: PerformanceType;
  venueName: string;
  venueAddress: string;
  image: string;
  ageRating: string;
  durationMinutes: number;
  stages: Stage[];
  artists: Artist[];
  prices: PriceInfo[];
  bookingLinks: BookingLink[];
  bookingSchedules?: BookingSchedule[];
  timetableSlots?: TimetableSlot[];
}
