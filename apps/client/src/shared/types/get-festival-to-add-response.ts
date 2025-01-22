interface FestivalToAdd {
  festivalId: number;
  posterUrl: string;
  title: string;
}

export interface GetFestivalToAddResponse {
  nextCursor: number;
  festivals: FestivalToAdd[];
}
