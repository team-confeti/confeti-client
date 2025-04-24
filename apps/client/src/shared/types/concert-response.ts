import { PerformanceBase } from './performance-common';

export interface Concert extends PerformanceBase {
  concertId: number;
  address: string;
  reservations: {
    url: string;
    name: string;
    logoUrl: string;
  }[];
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
