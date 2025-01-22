export interface UserProfile {
  userId: number;
  profileUrl: string;
  username: string;
}

interface Artists {
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
  type: 'concert' | 'festival';
  title: string;
  posterUrl: string;
}

export interface PerformanceResponse {
  performances: Performance[];
}
