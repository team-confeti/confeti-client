import { SortOption } from './sort-label';

export const END_POINT = {
  //내 공연
  GET_MY_RECORD: '/performances/record',
  GET_MY_TIMETABLE: '/user/timetables/preview',
  GET_MY_TIMETABLE_OVERVIEW: (sortBy: SortOption) =>
    `/user/timetables?sortBy=${sortBy}`,

  // 셋리스트
  GET_MY_SET_LIST: '/my/setlists/preview',
  GET_MY_SET_LIST_OVERVIEW: (sortBy: SortOption) =>
    `/my/setlists/all?sortBy=${sortBy}`,
  POST_ADD_PERFORMANCE_TO_SET_LIST: '/my/setlists',
  GET_SET_LIST_DETAIL: (setlistId: number) => `/my/setlists/${setlistId}`,
  POST_START_EDIT_SETLIST: (setlistId: number) =>
    `/my/setlists/${setlistId}/edit/start`,
  POST_COMPLETE_EDIT_SETLIST: (setlistId: number) =>
    `/my/setlists/${setlistId}/edit/complete`,
  DELETE_MUSIC_FROM_SETLIST: (setlistId: number, orders: number) =>
    `/my/setlists/${setlistId}/musics/${orders}`,
  DELETE_CANCEL_EDIT_SETLIST: (setlistId: number) =>
    `/my/setlists/${setlistId}/edit/cancel`,
  PATCH_REORDER_SETLIST: (setlistId: number) =>
    `/my/setlists/${setlistId}/edit/musics/order`,
  POST_ADD_MUSIC_TO_SETLIST: (setlistId: number) =>
    `/my/setlists/${setlistId}/musics`,

  // 마이페이지
  GET_USER_PROFILE: '/user/info',
  GET_MY_UPCOMING_PERFORMANCE: '/user/favorites/performance',
  GET_MY_ARTISTS_PREVIEW: '/user/favorites/artists/preview',
  GET_MY_PERFORMANCES_PREVIEW: '/user/favorites/performances/preview',
  GET_MY_ARTISTS: (sortBy: SortOption) =>
    `/user/favorites/artists?sortBy=${sortBy}`,
  GET_MY_PERFORMANCES: (performancesType: 'FESTIVAL' | 'CONCERT' | 'ALL') =>
    `/user/favorites/performances?type=${performancesType}`,

  POST_LIKE_ARTIST: (artistId: string) => `/user/favorites/artists/${artistId}`,
  POST_LIKE_FESTIVAL: (festivalId: number) =>
    `/user/favorites/festivals/${festivalId}`,
  POST_LIKE_CONCERT: (concertId: number) =>
    `/user/favorites/concerts/${concertId}`,
  PATCH_USER_INFO: '/user/info',
  GET_FESTIVAL_DETAIL: '/performances/festivals',
  GET_CONCERT_DETAIL: '/performances/concerts',

  // 홈 페이지
  GET_TICKETING: '/performances/reservation',
  GET_LATEST_PERFORMANCES: '/performances/info',
  GET_SUGGEST_PERFORMANCE: '/performances/recommend',
  GET_SUGGEST_MUSIC_PERFORMANCE: '/performances/recommend/performance',

  //타임 테이블
  GET_AVAILABLE_FESTIVALS: '/user/timetables/festivals',
  GET_FESTIVAL_TIMETABLE: (festivalDateId: number) =>
    `/user/timetables/festivals/${festivalDateId}`,
  POST_FESTIVAL_TIMETABLE: '/user/timetables/festivals',
  DEL_FESTIVAL_TIMETABLES: (festivalId: number) =>
    `/user/timetables/festivals/${festivalId}`,
  GET_FESTIVAL_TO_ADD: (cursor?: number) =>
    `/user/timetables/festivals/add${cursor ? `?cursor=${cursor}` : ''}`,
  FETCH_TIMETABLE_CREATION_HISTORY: `user/timetables/festivals/history`,

  //검색
  GET_SEARCH_ALL: '/search',
  GET_ARTISTS_SEARCH_RELATED_KEYWORD: (keyword: string, limit: number) =>
    `/artists/search/ac?term=${encodeURIComponent(keyword)}&limit=${limit}`,
  GET_PERFORMANCES_SEARCH_RELATED_KEYWORD: (keyword: string, limit: number) =>
    `/performances/search/ac?term=${encodeURIComponent(keyword)}&limit=${limit}`,

  GET_POPULAR_SEARCH: (limit: number) => `search/terms/popular?limit=${limit}`,
  GET_RECENT_VIEW: (items: string) => `performances/expected?items=${items}`,
  GET_MUSIC_SEARCH: (keyword: string, offset: number, limit: number) =>
    `my/setlists/search/musics?term=${keyword}&offset=${offset}&limit=${limit}`,
  GET_ARTIST_MUSIC_SEARCH: (
    aid: string,
    keyword: string,
    offset: number,
    limit: number,
  ) =>
    `my/setlists/search/artist-musics?aid=${aid}&term=${keyword}&offset=${offset}&limit=${limit}`,

  //로그인,로그아웃,토큰재발급
  POST_SOCIAL_LOGIN: '/auth/login',
  POST_LOGOUT: '/auth/logout',
  POST_REISSUE_TOKEN: '/auth/reissue',
  DELETE_ACCOUNT: '/auth/withdraw',

  //온보딩
  GET_TOP100_ARTIST: (limit: number) => `/user/onboard/artists?limit=${limit}`,
  GET_ARTIST_RELATED_KEYWORDS: (keyword: string, limit: number) =>
    `/user/onboard/artists/search?term=${encodeURIComponent(keyword)}&limit=${limit}`,
  GET_ARTIST_RELATED_ARTIST: (artistId: string, limit: number) =>
    `/user/onboard/artists/${artistId}/related?limit=${limit}`,
  GET_ONBOARDING_STATUS: '/user/onboard/state',
  POST_AUTH_ONBOARD: '/auth/onboard',
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const CACHE_TIME = {
  SHORT: 1000 * 60 * 3,
  MEDIUM: 1000 * 60 * 5,
  LONG: 1000 * 60 * 10,
} as const;
