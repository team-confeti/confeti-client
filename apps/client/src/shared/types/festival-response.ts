import { PerformanceBase } from './performance-common';

export interface Festival extends PerformanceBase {
  festivalId: number;
  address: string;
  reservations: {
    url: string;
    name: string;
    logoUrl: string;
  }[];
}

export interface FestivalDate {
  festivalDateId: number;
  festivalAt: string;
  isOpen: boolean;
  artists: FestivalArtist[];
}

export interface FestivalArtist {
  artistId: string;
  name: string;
  profileUrl: string;
}

export interface FestivalDetailResponse {
  festival: Festival;
  festivalDates: FestivalDate[];
}
