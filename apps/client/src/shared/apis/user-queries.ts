import { queryOptions } from '@tanstack/react-query';
import { getUserProfile } from './user';
import { getPerformances } from './performances';

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  FAVORITE_ARTISTS: () => [...USER_QUERY_KEY.ALL, 'artists'],
  FAVORITE_PERFORMANCES: () => [...USER_QUERY_KEY.ALL, 'performances'],
} as const;

export const PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
} as const;

export const USER_QUERY_OPTIONS = {
  ALL: () =>
    queryOptions({ queryKey: USER_QUERY_KEY.ALL, queryFn: getUserProfile }),
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    }),
  FAVORITE_ARTISTS: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.FAVORITE_ARTISTS(),
      queryFn: getUserProfile,
    }),
  FAVORITE_PERFORMANCES: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.FAVORITE_PERFORMANCES(),
      queryFn: getUserProfile,
    }),
};

export const PERFORMANCE_QUERY_OPTIONS = {
  ALL: () =>
    queryOptions({
      queryKey: PERFORMANCE_QUERY_KEY.ALL,
      queryFn: getPerformances,
    }),
};
