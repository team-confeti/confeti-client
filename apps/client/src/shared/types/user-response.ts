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
