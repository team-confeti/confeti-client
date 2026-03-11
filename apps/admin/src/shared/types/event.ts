import type { Artist } from './artist';
import type { BookingLink, BookingSchedule, PriceInfo, Stage } from './common';
import type { TimetableSlot } from './timetable';

export type EventType = 'Festival' | 'Concert';

export type EventStatus =
  | 'Pending'
  | 'Published'
  | 'Draft'
  | 'Scheduled'
  | 'Completed';

export interface EventItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  type: EventType;
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
