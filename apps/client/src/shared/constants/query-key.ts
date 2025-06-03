import {
  ArtistMusicSearchRequest,
  MusicSearchRequest,
  SetListPerformanceRequest,
} from '../types/my-history-response';
import { IntendedPerformanceRequest } from '../types/search-reponse';
import { SortOption } from './sort-label';

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  MY_ARTISTS: () => [...USER_QUERY_KEY.ALL, 'artists'],
  MY_PERFORMANCES: () => [...USER_QUERY_KEY.ALL, 'performances'],
  MY_UPCOMING_PERFORMANCE: () => [
    ...USER_QUERY_KEY.ALL,
    'upcoming-performance',
  ],
} as const;

export const PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
  CONCERT: (concertId: number) => [
    ...PERFORMANCE_QUERY_KEY.ALL,
    'concert',
    concertId,
  ],
  FESTIVAL: (festivalId: number) => [
    ...PERFORMANCE_QUERY_KEY.ALL,
    'festival',
    festivalId,
  ],
} as const;

export const HOME_QUERY_KEY = {
  ALL: ['home'],
  LATEST_PERFORMANCES: () => [...HOME_QUERY_KEY.ALL, 'latest-performances'],
  TICKETING: () => [...HOME_QUERY_KEY.ALL, 'ticketing'],
  SUGGEST_PERFORMANCE: () => [...HOME_QUERY_KEY.ALL, 'suggest-performance'],
  SUGGEST_MUSIC_PERFORMANCE: () => [...HOME_QUERY_KEY.ALL, 'suggest-music'],
  SUGGEST_MUSIC: (performanceId: number) => [
    ...HOME_QUERY_KEY.ALL,
    performanceId,
  ],
} as const;

export const FESTIVAL_TIMETABLE_QUERY_KEY = {
  ALL: ['festival-timetable'],
  ONBOARDING: () => [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL, 'onboarding'],
  FESTIVAL_TIMETABLE: (festivalId: number) => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    festivalId,
  ],
  AVAILABLE_FESTIVALS: () => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    'available-festivals',
  ],
  ADDABLE_FESTIVALS: () => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    'addable-festivals',
  ],
} as const;

export const SEARCH_PAGE_QUERY_KEY = {
  ALL: ['search'],
  SEARCH_POPULAR_SEARCH: () => [...SEARCH_PAGE_QUERY_KEY.ALL, 'popular'],
  RECENT_VIEW: (items: string) => [...SEARCH_PAGE_QUERY_KEY.ALL, items],
} as const;

export const SEARCH_ARTIST_QUERY_KEY = {
  ALL: ['search-artist'],
  SEARCH_ARTIST: (keyword: string) => [...SEARCH_ARTIST_QUERY_KEY.ALL, keyword],
} as const;

export const SEARCH_PERFORMANCE_QUERY_KEY = {
  ALL: ['search-performance'],
  SEARCH_PERFORMANCES: (keyword: string) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    keyword,
  ],
  SEARCH_PERFORMANCE_TYPE_ANALYSIS: (keyword: string) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    keyword,
  ],
  SEARCH_INTENDED_PERFORMANCE: (request: IntendedPerformanceRequest) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    request.pid,
    request.aid,
  ],
} as const;

export const ARTIST_RELATED_QUERY_KEY = {
  ALL: ['related'],
  RELATED_ARTIST: (artistId: string) => [
    ...ARTIST_RELATED_QUERY_KEY.ALL,
    artistId,
  ],
  RELATED_KEYWORD: (keyword: string) => [
    ...ARTIST_RELATED_QUERY_KEY.ALL,
    keyword,
  ],
} as const;

export const MY_TIMETABLE_QUERY_KEY = {
  ALL: ['myTimetable'],
  PREVIEW: () => [...MY_TIMETABLE_QUERY_KEY.ALL, 'preview'],
  OVERVIEW: (sortBy: SortOption) => [...MY_TIMETABLE_QUERY_KEY.ALL, sortBy],
} as const;

export const SETLIST_QUERY_KEY = {
  ALL: ['setlist'],
  SEARCH_PERFORMANCE: (request: SetListPerformanceRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    request.aid,
    request.pid,
  ],
  SEARCH_MUSIC: (request: MusicSearchRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    request.term,
  ],
  SEARCH_ARTIST_MUSIC: (request: ArtistMusicSearchRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    request.aid,
  ],
  PREVIEW: () => [...SETLIST_QUERY_KEY.ALL, 'preview'],
  OVERVIEW: (sortBy: SortOption) => [...SETLIST_QUERY_KEY.ALL, sortBy],
  DETAIL: (setlistId: number) => [...SETLIST_QUERY_KEY.ALL, setlistId],
} as const;

export const RECORD_QUERY_KEY = {
  ALL: ['record'],
} as const;

export const TOP_100_ARTIST_QUERY_KEY = {
  ALL: ['top-artist'],
  TOP_ARTIST: (limit: number) => [...TOP_100_ARTIST_QUERY_KEY.ALL, limit],
} as const;

export const LIKE_QUERY_KEY = {
  ALL: ['like'],
  LIKE_ARTIST: (artistId: string) => [
    ...LIKE_QUERY_KEY.ALL,
    'artist',
    artistId,
  ],
  LIKE_FESTIVAL: (typeId: number) => [
    ...LIKE_QUERY_KEY.ALL,
    'festival',
    typeId,
  ],
  LIKE_CONCERT: (typeId: number) => [...LIKE_QUERY_KEY.ALL, 'concert', typeId],
} as const;
