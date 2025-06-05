export interface ArtistSearch {
  artistId: string | null;
  name: string;
  profileUrl: string;
  recentAlbumName: string;
  isFavorite: boolean;
  isMultipleArtists: boolean;
}

export interface ArtistSearchResponse {
  artist: ArtistSearch;
}

export interface Performance {
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT';
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
  id: number;
  title: string;
  posterUrl: string;
}

export interface RelatedPerformanceResponse {
  performances: RelatedPerformance[];
}

export interface PopularSearch {
  rank: number;
  popularTerm: string;
}

export interface PopularSearchResponse {
  popularTerms: PopularSearch[];
}

export interface RecentPerformanceView {
  performanceId: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT';
  title: string;
  posterUrl: string;
}

export interface RecentPerformanceViewResponse {
  performances: RecentPerformanceView[];
}

export interface SearchAllResponse {
  // TODO: ArtistSearch 내부 타입 수정 필요
  artist: ArtistSearch;
  performanceCount: number;
  performances: Performance[];
}
