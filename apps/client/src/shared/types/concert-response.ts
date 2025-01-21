import { PerformanceBase } from './performance-common';

export interface Concert extends PerformanceBase {
  concertId: number;
}

export interface ConcertArtist {
  artistId: string;
  name: string;
  profileUrl: string;
}

export interface ConcertDetailResponse {
  concert: Concert;
  isOpen: boolean;
  concertArtists: ConcertArtist[];
}
