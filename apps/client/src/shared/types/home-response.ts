export interface Performances {
  index: number;
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  reserveAt: string;
  area: string;
  posterUrl: string;
}

export type TicketingPerformances = Pick<
  Performances,
  'index' | 'typeId' | 'type' | 'subtitle' | 'reserveAt'
>;

export type TicketingPerformancesResponse = {
  performanceCount: number;
  performances: TicketingPerformances[];
};

export type CarouselPerformances = Pick<
  Performances,
  'performanceId' | 'typeId' | 'type' | 'title' | 'startAt' | 'posterUrl'
>;

export type CarouselPerformancesResponse = {
  isPersonalized: boolean;
  performances: CarouselPerformances[];
};
