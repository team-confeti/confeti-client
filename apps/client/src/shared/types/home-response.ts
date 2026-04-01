import type { PerformanceType } from './performance-type';
import type { ReservationSchedule } from './performance-common';

export interface Performances {
  index: number;
  performanceId: number;
  typeId: number;
  type: PerformanceType;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  reserveAt: string;
  area: string;
  posterUrl: string;
  isFavorite: boolean;
}

export interface TicketingPerformances {
  index: number;
  typeId: number;
  type: PerformanceType | 'concert' | 'festival' | 'performance';
  title: string;
  roundName: ReservationSchedule['roundName'];
  reserveAt: ReservationSchedule['reserveAt'];
}

export type CarouselPerformances = Pick<
  Performances,
  | 'performanceId'
  | 'typeId'
  | 'type'
  | 'title'
  | 'startAt'
  | 'posterUrl'
  | 'area'
  | 'isFavorite'
>;

export type SuggestPerformance = Pick<
  Performances,
  'typeId' | 'type' | 'title' | 'posterUrl'
>;

export type musics = {
  musicId: string;
  artistName: string;
  trackName: string;
  artworkUrl: string;
  previewUrl: string;
};

export type TicketingPerformancesResponse = {
  isPersonalized: boolean;
  performanceCount: number;
  performances: TicketingPerformances[];
};

export type CarouselPerformancesResponse = {
  performances: CarouselPerformances[];
};

export type SuggestPerformanceResponse = {
  performances: SuggestPerformance[];
};

export interface SuggestMusicPerformanceResponse {
  performanceId: number;
  title: string;
}

export interface SuggestMusicResponse {
  musics: musics[];
}

export interface RecommendSong {
  songId: string;
  songName: string;
  artistName: string;
  artworkUrl: string;
  previewUrl: string;
}

export interface RecommendPerformances {
  typeId: number;
  type: 'concert' | 'festival';
  title: string;
  posterUrl: string;
  songs: RecommendSong[];
}

export interface RecommendPerformancesResponse {
  performances: RecommendPerformances[];
}
