import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/constants/api';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import { BaseResponse } from '@shared/types/api';
import { onboardStatusResponse } from '@shared/types/onboard-response';

import { get } from '../config/instance';

export const ONBOARD_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: ['onboard'] }),
  STATUS: () =>
    queryOptions({
      queryKey: ONBOARD_QUERY_KEY.STATUS(),
      queryFn: () => getOnboardStatus(),
    }),
};

export const getOnboardStatus = async (): Promise<onboardStatusResponse> => {
  const response = await get<BaseResponse<onboardStatusResponse>>(
    END_POINT.GET_ONBOARDING_STATUS,
  );

  return response.data;
};
