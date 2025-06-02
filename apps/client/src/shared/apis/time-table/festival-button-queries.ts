import { queryOptions } from '@tanstack/react-query';

import { FESTIVAL_BUTTON_QUERY_KEY } from '@shared/constants/query-key';

import { getFestivalButton } from './festival-button';

export const FESTIVAL_BUTTON_QUERY_OPTIONS = {
  FESTIVAL_BUTTON: () =>
    queryOptions({
      queryKey: FESTIVAL_BUTTON_QUERY_KEY.ALL,
      queryFn: getFestivalButton,
    }),
};
