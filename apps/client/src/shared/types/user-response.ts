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

export interface MyArtists extends Artists {
  createdAt: string;
  isFavorite: boolean;
}

export interface MyArtistsResponse {
  artists: MyArtists[];
  artistCount: number;
}

export interface FavoriteArtistsResponses {
  artists: Artists[];
}

export type PerformancesFilterType = 'FESTIVAL' | 'CONCERT' | 'ALL';

export interface Performance {
  index: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT';
  title: string;
  posterUrl: string;
}

export interface MyPerformances extends Omit<Performance, 'index'> {
  startAt: string;
  endAt: string;
  area: string;
  isFavorite: boolean;
}

export interface PerformanceResponse {
  performances: Performance[];
}

export interface MyPerformancesResponse {
  performances: MyPerformances[];
}

export interface UserInfo {
  name: string;
  profileFile?: File;
  profileUrl?: string;
}
