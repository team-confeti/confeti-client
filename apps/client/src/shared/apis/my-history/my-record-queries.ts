import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { RECORD_QUERY_KEY } from '@shared/constants/query-key';
import { MyHistoryRecord } from '@shared/types/my-history-response';

export const MY_RECORD_QUERY_OPTION = {
  ALL: () =>
    queryOptions({
      queryKey: RECORD_QUERY_KEY.ALL,
      queryFn: getMyHistoryRecord,
    }),
};

export const getMyHistoryRecord = async () => {
  const response = await get<BaseResponse<MyHistoryRecord>>(
    END_POINT.GET_MY_RECORD,
  );
  return response.data;
};
