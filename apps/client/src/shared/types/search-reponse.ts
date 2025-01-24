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

export interface Performance {
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  title: string;
  performanceStartAt: string;
  performanceEndAt: string;
  posterUrl: string;
  area: string;
  isFavorite: boolean;
}

export interface GetPerformancesSearchResponse {
  nextCursor: number;
  performances: Performance[];
}
