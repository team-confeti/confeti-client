export interface UserProfile {
  userId: number;
  profileUrl: string;
  name: string;
  provider: 'KAKAO' | 'APPLE';
}

export interface Artists {
  artistId: string;
  name: string;
  profileUrl: string;
}

export interface FavoriteArtistsResponses {
  artists: Artists[];
}

export interface Performance {
  index: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  title: string;
  posterUrl: string;
}

export interface PerformanceResponse {
  performances: Performance[];
}

export type PerformancesFilterType = 'FESTIVAL' | 'CONCERT' | 'ALL';

export interface MyPerformances extends Omit<Performance, 'index'> {
  startAt: string;
  endAt: string;
  area: string;
  isFavorite: boolean;
}

export interface MyPerformancesResponse {
  performances: MyPerformances[];
}
