import { queryOptions } from '@tanstack/react-query';

import { PerformancesFilterType } from './../../types/user-response';
import {
  getMyArtistsPreview,
  getMyPerformances,
  getMyPerformancesPreview,
  getUserProfile,
} from './user';

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  MY_ARTISTS: () => [...USER_QUERY_KEY.ALL, 'artists'],
  MY_PERFORMANCES: () => [...USER_QUERY_KEY.ALL, 'performances'],
} as const;

export const USER_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: USER_QUERY_KEY.ALL }),
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    }),
  MY_ARTISTS_PREVIEW: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.MY_ARTISTS(),
      queryFn: getMyArtistsPreview,
    }),
  MY_PERFORMANCES_PREVIEW: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.MY_PERFORMANCES(),
      queryFn: getMyPerformancesPreview,
    }),
  MY_PERFORMANCES: (performancesType: PerformancesFilterType) =>
    queryOptions({
      queryKey: [USER_QUERY_KEY.MY_PERFORMANCES(), performancesType],
      queryFn: () => getMyPerformances(performancesType),
    }),
};
