export interface TopArtist {
  artistId: number;
  profileUrl: string;
  name: string;
}

export interface TopArtistResponse {
  artists: TopArtist[];
}
