export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const END_POINT = {
  GET_USER_PROFILE: '/user/info',
  GET_FAVORITE_ARTISTS: '/user/favorites/artists',
  GET_FAVORITE_PERFORMANCES: '/user/favorites/performances',
  POST_LIKE_ARTIST: (artistId: number) => `/user/favorites/artists/${artistId}`,
  GET_ARTISTS_SEARCH: `artists?search=`,
  GET_PERFORMANCES_SEARCH: (artistId: number, cursor: number) =>
    `performances/association/${artistId}?cursor=${cursor}`,
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
