import { queryOptions } from '@tanstack/react-query';
import { getUserProfile } from './user';

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  FAVORITE_ARTISTS: () => [...USER_QUERY_KEY.ALL, 'artists'],
  FAVORITE_PERFORMANCES: () => [...USER_QUERY_KEY.ALL, 'performances'],
} as const;

export const USER_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: USER_QUERY_KEY.ALL }),
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    }),
  FAVORITE_ARTISTS: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.FAVORITE_ARTISTS(),
    }),
  FAVORITE_PERFORMANCES: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.FAVORITE_PERFORMANCES(),
    }),
};
