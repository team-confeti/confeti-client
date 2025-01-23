export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const END_POINT = {
  GET_USER_PROFILE: '/user/info',
  GET_FAVORITE_ARTISTS: '/user/favorites/artists',
  GET_FAVORITE_PERFORMANCES: '/user/favorites/performances',
  POST_LIKE_ARTIST: (artistId: string) => `/user/favorites/artists/${artistId}`,
  POST_LIKE_FESTIVAL: (festivalId: number) =>
    `/user/favorites/festivals/${festivalId}`,
  POST_LIKE_CONCERT: (concertId: number) =>
    `user/favorites/concerts/${concertId}`,
  GET_FESTIVAL_DETAIL: '/performances/festivals',
  GET_CONCERT_DETAIL: '/performances/concerts',
  GET_TICKETING: '/performances/reservation',
  //타임 테이블
  GET_FESTIVAL_BUTTON: '/user/timetables/festivals',
  GET_FESTIVAL_TIMETABLE: (festivalDateId: number) =>
    `user/timetables/festivals/${festivalDateId}`,
  POST_FESTIVAL_TIMETABLE: `user/timetables/festivals`,
  //검색
  GET_ARTISTS_SEARCH: `artists?search=`,
  GET_PERFORMANCES_SEARCH: (artistId: number, cursor: number) =>
    `performances/association/${artistId}?cursor=${cursor}`,
  GET_FESTIVAL_TO_ADD: (cursor?: number) =>
    `/user/timetables/festivals/add${cursor ? `?cursor=${cursor}` : ''}`,
  DEL_FESTIVAL_TIMETABLES: (festivalId: number) =>
    `user/timetables/festivals/${festivalId}`,
  GET_PERFORMANCE_FAVORITE: '/user/favorites/performances/preview',
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
