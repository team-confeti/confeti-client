import { queryOptions } from '@tanstack/react-query';
import { getUserProfile } from './use-user-info';

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  FAVORITE_ARTISTS: () => [...USER_QUERY_KEY.ALL, 'artists'],
  FAVORITE_PERFORMANCES: () => [...USER_QUERY_KEY.ALL, 'performances'],
} as const;

export const USER_QUERY_OPTIONS = {
  ALL: () =>
    queryOptions({ queryKey: USER_QUERY_KEY.ALL, queryFn: getUserProfile }),
};
