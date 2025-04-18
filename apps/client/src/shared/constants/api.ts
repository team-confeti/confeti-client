export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const END_POINT = {
  GET_USER_PROFILE: '/user/info',
  GET_MY_ARTISTS_PREVIEW: '/user/favorites/artists/preview',
  GET_MY_PERFORMANCES_PREVIEW: '/user/favorites/performances/preview',
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
  GET_ARTISTS_SEARCH: `artists?search=`,
  GET_PERFORMANCES_SEARCH: (artistId: string, cursor: number) =>
    `performances/association/${artistId}?cursor=${cursor}`,
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
  GET_TOP100_ARTIST: 'user/onboard/artists',
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
