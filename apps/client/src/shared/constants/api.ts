export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const END_POINT = {
  GET_USER_PROFILE: '/user/info',
  GET_FAVORITE_ARTISTS: '/user/favorite/artists',
  GET_FAVORITE_PERFORMANCES: '/user/favorite/performances',
} as const;
