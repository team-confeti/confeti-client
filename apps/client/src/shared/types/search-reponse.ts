export interface ArtistSearch {
  artistId: string | null;
  name: string;
  profileUrl: string;
  latestReleaseAt: string;
  isFavorite: boolean;
  isMultipleArtists: boolean;
}

export interface ArtistSearchResponse {
  artist: ArtistSearch;
}

export interface Performance {
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  title: string;
  startAt: string;
  endAt: string;
  posterUrl: string;
  area: string;
  isFavorite: boolean;
}

export interface PerformancesSearchResponse {
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
