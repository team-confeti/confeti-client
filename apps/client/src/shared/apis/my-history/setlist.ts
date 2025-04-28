import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  SetListPerformance,
  SetListPerformanceRequest,
  SetListPerformanceResponse,
} from '@shared/types/my-history-response';

import { get, post } from '../config/instance';

export const getSetListPerformance = async (
  request: SetListPerformanceRequest,
): Promise<SetListPerformanceResponse> => {
  const { pid, aid, term } = request;

  const query = new URLSearchParams();

  if (pid !== null) query.append('pid', String(pid));
  if (aid !== null) query.append('aid', aid);
  if (term !== null) query.append('term', term);

  const url = `my/setlists/search/performances?${query.toString()}`;

  const response = await get<BaseResponse<SetListPerformanceResponse>>(url);
  return response.data;
};

export const postAddPerformanceToSetList = async (
  items: Pick<SetListPerformance, 'type' | 'typeId'>[],
) => {
  const response = await post<BaseResponse<void>>(
    END_POINT.POST_ADD_PERFORMANCE_TO_SET_LIST,
    items,
  );

  return response.data;
};
