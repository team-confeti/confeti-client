interface Artists {
  artistId: string;
  name: string;
  profileUrl: string;
}

export interface FavoriteArtistsResponses {
  artists: Artists[];
}
