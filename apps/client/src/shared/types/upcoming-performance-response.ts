interface UpcomingPerformance {
  index: number;
  performanceId: number;
  type: 'concert' | 'festival';
  subtitle: string;
  reserveAt: string;
  reservationBgUrl: string;
}

export interface UpcomingPerformancesResponse {
  performanceCount: number;
  performances: UpcomingPerformance[];
}
