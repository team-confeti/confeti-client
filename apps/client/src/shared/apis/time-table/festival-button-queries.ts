import { queryOptions } from '@tanstack/react-query';
import { getFestivalButton } from './festival-button';

export const FESTIVAL_BUTTON_QUERY_KEY = {
  ALL: ['festivalButton'],
} as const;

export const FESTIVAL_BUTTON_QUERY_OPTIONS = {
  FESTIVAL_BUTTON: () =>
    queryOptions({
      queryKey: FESTIVAL_BUTTON_QUERY_KEY.ALL,
      queryFn: getFestivalButton,
    }),
};
