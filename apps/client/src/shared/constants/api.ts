export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const END_POINT = {
  GET_USER_PROFILE: '/user/info',
  GET_FAVORITE_ARTISTS: '/user/favorites/artists',
  GET_FAVORITE_PERFORMANCES: '/user/favorites/performances',
  POST_LIKE_ARTIST: (artistId: string) => `/user/favorites/artists/${artistId}`,
  POST_LIKE_FESTIVAL: (festivalId: number) =>
    `/user/favorites/festivals/${festivalId}`,
  GET_FESTIVAL_DETAIL: '/performances/festivals',
  GET_CONCERT_DETAIL: '/performances/concerts',
  GET_TICKETING: '/performances/reservation',
  GET_FESTIVAL_TIMETABLES: '/user/timetables/festivals',
  GET_ARTISTS_SEARCH: `artists?search=`,
  GET_PERFORMANCES_SEARCH: (artistId: number, cursor: number) =>
    `performances/association/${artistId}?cursor=${cursor}`,
  GET_FESTIVAL_TO_ADD: (cursor?: number) =>
    `/user/timetables/festivals/add${cursor ? `?cursor=${cursor}` : ''}`,
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
