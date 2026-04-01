export interface ReservationSchedule {
  reservationScheduleId?: number;
  roundName: string;
  reserveAt: string;
}

export interface PerformanceBase {
  posterUrl: string;
  title: string;
  startAt: string;
  endAt: string;
  area: string;
  reservationSchedules: ReservationSchedule[];
  time: string;
  ageRating: string;
  price: string;
  isFavorite: boolean;
}
