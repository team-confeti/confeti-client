export interface ArtistSearch {
  artistId: string;
  name: string;
  profileUrl: string;
  latestReleaseAt: string;
  isFavorite: boolean;
  isMultipleArtists: boolean;
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
  performanceCount: number;
  performances: Performance[];
}

export interface RelatedArtist {
  artistId: string;
  name: string;
  profileUrl: string;
}

export interface RelatedArtistResponse {
  artists: RelatedArtist[];
}
