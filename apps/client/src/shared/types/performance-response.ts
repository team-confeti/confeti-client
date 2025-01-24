export interface Performances {
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  title: string;
  subtitle: string;
  performanceAt: string;
  posterUrl: string;
}

export interface PerformanceResponse {
  performances: Performances[];
}
