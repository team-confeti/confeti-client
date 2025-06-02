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
  SUGGEST_MUSIC: (performanceId: number, musicIds?: string[]) => [
    ...HOME_QUERY_KEY.ALL,
    'suggest-music',
    performanceId,
    musicIds,
  ],
} as const;

export const FESTIVAL_TIMETABLE_QUERY_KEY = {
  ALL: ['festival-timetable'],
  ONBOARDING: () => [...FESTIVAL_TIMETABLE_QUERY_KEY.ALL, 'onboarding'],
  DELETE_TIME_TABLE_FESTIVAL: (festivalId: number) => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    festivalId,
  ],
  AVAILABLE_FESTIVALS: () => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    'available-festivals',
  ],
  ADDABLE_FESTIVALS: () => [
    ...FESTIVAL_TIMETABLE_QUERY_KEY.ALL,
    'get-festival-to-add-list',
  ],
} as const;

export const SEARCH_PAGE_QUERY_KEY = {
  ALL: ['search'],
  SEARCH_POPULAR_SEARCH: () => [...SEARCH_PAGE_QUERY_KEY.ALL, 'popular'],
  RECENT_VIEW: (items: string) => [
    ...SEARCH_PAGE_QUERY_KEY.ALL,
    'recent',
    items,
  ],
} as const;

export const SEARCH_ARTIST_QUERY_KEY = {
  ALL: ['artist'],
  SEARCH_ARTIST: (keyword: string) => [
    ...SEARCH_ARTIST_QUERY_KEY.ALL,
    'search',
    keyword,
  ],
} as const;

export const SEARCH_PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
  SEARCH_PERFORMANCES: (keyword: string) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    'search',
    keyword,
  ],
  SEARCH_PERFORMANCE_TYPE_ANALYSIS: (keyword: string) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    'type-analysis',
    keyword,
  ],
  SEARCH_INTENDED_PERFORMANCE: (request: IntendedPerformanceRequest) => [
    ...SEARCH_PERFORMANCE_QUERY_KEY.ALL,
    'intended',
    request.pid,
    request.aid,
    request.ptitle,
    request.ptype,
  ],
} as const;

export const ARTIST_RELATED_QUERY_KEY = {
  ALL: ['related'],
  RELATED_ARTIST: (artistId: string) => [
    ...ARTIST_RELATED_QUERY_KEY.ALL,
    'artist',
    artistId,
  ],
  RELATED_KEYWORD: (keyword: string) => [
    ...ARTIST_RELATED_QUERY_KEY.ALL,
    'keyword',
    keyword,
  ],
} as const;

export const MY_TIMETABLE_QUERY_KEY = {
  ALL: ['myTimetable'],
  PREVIEW: () => [...MY_TIMETABLE_QUERY_KEY.ALL, 'preview'],
  OVERVIEW: (sortBy: SortOption) => [
    ...MY_TIMETABLE_QUERY_KEY.ALL,
    'overview',
    sortBy,
  ],
} as const;

export const SETLIST_QUERY_KEY = {
  ALL: ['setlist'],
  SEARCH_PERFORMANCE: (request: SetListPerformanceRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'performance',
    request,
  ],
  SEARCH_MUSIC: (request: MusicSearchRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'music',
    request,
  ],
  SEARCH_ARTIST_MUSIC: (request: ArtistMusicSearchRequest) => [
    ...SETLIST_QUERY_KEY.ALL,
    'artist-music',
    request,
  ],
  DETAIL: (setlistId: number) => [
    ...SETLIST_QUERY_KEY.ALL,
    'detail',
    setlistId,
  ],
  PREVIEW: () => [...SETLIST_QUERY_KEY.ALL, 'preview'],
  OVERVIEW: (sortBy: SortOption) => [
    ...SETLIST_QUERY_KEY.ALL,
    'overview',
    sortBy,
  ],
} as const;

export const RECORD_QUERY_KEY = {
  ALL: ['record'],
} as const;

export const TOP_100_ARTIST_QUERY_KEY = {
  ALL: ['top-artist'],
  TOP_ARTIST: (limit: number) => [
    ...TOP_100_ARTIST_QUERY_KEY.ALL,
    'top-artist',
    limit,
  ],
} as const;

export const MY_HISTORY_QUERY_KEY = {
  ALL: ['my-history'],
  TIMETABLE: {
    ALL: () => [...MY_HISTORY_QUERY_KEY.ALL, 'timetable'],
    PREVIEW: () => [...MY_HISTORY_QUERY_KEY.ALL, 'timetable', 'preview'],
    OVERVIEW: (sortBy: SortOption) => [
      ...MY_HISTORY_QUERY_KEY.ALL,
      'timetable',
      'overview',
      sortBy,
    ],
  },
  SETLIST: {
    ALL: () => [...MY_HISTORY_QUERY_KEY.ALL, 'setlist'],
    PREVIEW: () => [...MY_HISTORY_QUERY_KEY.ALL, 'setlist', 'preview'],
    OVERVIEW: (sortBy: SortOption) => [
      ...MY_HISTORY_QUERY_KEY.ALL,
      'setlist',
      'overview',
      sortBy,
    ],
  },
  RECORD: {
    ALL: () => [...MY_HISTORY_QUERY_KEY.ALL, 'record'],
  },
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
