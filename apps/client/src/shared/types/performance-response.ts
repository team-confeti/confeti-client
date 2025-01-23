export interface Performances {
  performanceId: number;
  typeId: number;
  type: 'concert' | 'festival';
  title: string;
  subtitle: string;
  performanceAt: string;
  posterUrl: string;
}

export interface PerformanceResponse {
  performances: Performances[];
}
