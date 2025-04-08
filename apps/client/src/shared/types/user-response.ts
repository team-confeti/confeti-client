export interface UserProfile {
  userId: number;
  profileUrl: string;
  name: string;
  provider: string;
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
