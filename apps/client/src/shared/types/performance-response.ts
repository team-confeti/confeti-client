import type { PerformanceType } from './performance-type';

export interface Performances {
  performanceId: number;
  typeId: number;
  type: PerformanceType | 'ARTIST';
  title: string;
  subtitle: string;
  performanceAt: string;
  posterUrl: string;
}

export interface PerformanceResponse {
  performances: Performances[];
}
