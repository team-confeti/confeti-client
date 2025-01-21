export interface ArtistSearch {
  artist?: {
    artistId: string;
    name: string;
    profileUrl: string;
    latestReleaseAt: string;
    isFavorite: boolean;
    isMultipleArtists: boolean;
  };
}
