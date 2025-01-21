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

export interface PerformanceSearch {
  nextCursor: string;
  performances: {
    performanceId: number;
    type: string;
    title: string;
    performanceAt: Date;
    posterUrl: string;
    area: string;
    isFavorite: boolean;
  };
}
