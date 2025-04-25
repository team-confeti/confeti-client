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

export interface RelatedPerformance {
  id: string;
  title: string;
  posterUrl: string;
}

export interface RelatedPerformanceResponse {
  performances: RelatedPerformance[];
}

export interface PerformanceTypeAnalysis {
  processedTerm: string;
  performanceType: 'CONCERT' | 'FESTIVAL' | 'PERFORMANCE';
}

export interface IntendedPerformance {
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  title: string;
  posterUrl: string;
  area: string;
  startAt: string;
  endAt: string;
  isFavorite: boolean;
}

export interface IntendedPerformanceResponse {
  performanceCount: number;
  performances: IntendedPerformance[];
}

export interface IntendedPerformanceRequest {
  pid: number | null;
  aid: string | null;
  ptitle: string | null;
  ptype: 'FESTIVAL' | 'CONCERT' | 'PERFORMANCE' | null;
}
