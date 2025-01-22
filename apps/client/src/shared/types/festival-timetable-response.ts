interface FestivalDate {
  festivalDateId: number;
  festivalAt: string;
}

interface FestivalTimetable {
  festivalId: number;
  title: string;
  logoUrl: string;
  festivalDates: FestivalDate[];
}

export interface FestivalTimetableResponse {
  festivals: FestivalTimetable[];
}
