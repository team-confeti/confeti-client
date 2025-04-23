import { SortOption } from './sort-label';

export const CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL as string,
  KAKAO_REDIRECT_URI: import.meta.env.VITE_KAKAO_REDIRECT_URI as string,
  KAKAO_URI: import.meta.env.VITE_KAKAO_URI as string,
  AMPLITUDE_API_KEY: import.meta.env.VITE_AMPLITUDE_API_KEY as string,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
} as const;

export const END_POINT = {
  //내 공연
  GET_MY_TIMETABLE: 'user/timetables/preview',
  GET_MY_TIMETABLE_OVERVIEW: (sortBy: SortOption) =>
    `user/timetables?sortBy=${sortBy}`,
  GET_USER_PROFILE: '/user/info',
  GET_MY_UPCOMING_PERFORMANCE: '/user/favorites/performance',
  GET_MY_ARTISTS_PREVIEW: '/user/favorites/artists/preview',
  GET_MY_PERFORMANCES_PREVIEW: '/user/favorites/performances/preview',
  GET_MY_ARTISTS: (sortBy: 'createdAt' | 'alphabetically') =>
    `/user/favorites/artists?sortBy=${sortBy}`,
  GET_MY_PERFORMANCES: (performancesType: 'FESTIVAL' | 'CONCERT' | 'ALL') =>
    `user/favorites/performances?type=${performancesType}`,

  POST_LIKE_ARTIST: (artistId: string) => `/user/favorites/artists/${artistId}`,
  POST_LIKE_FESTIVAL: (festivalId: number) =>
    `/user/favorites/festivals/${festivalId}`,
  POST_LIKE_CONCERT: (concertId: number) =>
    `user/favorites/concerts/${concertId}`,
  GET_FESTIVAL_DETAIL: '/performances/festivals',
  GET_CONCERT_DETAIL: '/performances/concerts',
  GET_TICKETING: '/performances/reservation',
  GET_LATEST_PERFORMANCES: 'performances/info',

  //타임 테이블
  GET_FESTIVAL_BUTTON: '/user/timetables/festivals',
  GET_FESTIVAL_TIMETABLE: (festivalDateId: number) =>
    `user/timetables/festivals/${festivalDateId}`,
  POST_FESTIVAL_TIMETABLE: `user/timetables/festivals`,

  //검색
  GET_ARTISTS_SEARCH: `artists/search?term=`,
  GET_ARTISTS_SEARCH_RELATED_KEYWORD: (keyword: string, limit: number) =>
    `artists/search/ac?term=${encodeURIComponent(keyword)}&limit=${limit}`,
  GET_PERFORMANCES_SEARCH: (artistId: string | null) =>
    `performances/association/${artistId}`,
  GET_FESTIVAL_TO_ADD: (cursor?: number) =>
    `/user/timetables/festivals/add${cursor ? `?cursor=${cursor}` : ''}`,
  DEL_FESTIVAL_TIMETABLES: (festivalId: number) =>
    `user/timetables/festivals/${festivalId}`,

  //로그인,로그아웃,토큰재발급
  POST_SOCIAL_LOGIN: 'auth/login',
  POST_LOGOUT: 'auth/logout',
  POST_REISSUE_TOKEN: 'auth/reissue',
  DELETE_ACCOUNT: 'auth/withdraw',
  //온보딩
  GET_TOP100_ARTIST: (limit: number) => `user/onboard/artists?limit=${limit}`,
  GET_ARTIST_RELATED_KEYWORDS: (keyword: string, limit: number) =>
    `user/onboard/artists/search?term=${encodeURIComponent(keyword)}&limit=${limit}`,
  GET_ARTIST_RELATED_ARTIST: (artistId: string, limit: number) =>
    `user/onboard/artists/${artistId}/related?limit=${limit}`,
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
