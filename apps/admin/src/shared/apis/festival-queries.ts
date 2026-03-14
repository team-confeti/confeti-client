import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { FESTIVAL_QUERY_KEY } from '@shared/constants/query-key';
import {
  AdminFestivalDetailResponse,
  AdminFestivalListQueryResponse,
} from '@shared/types/api';

export const FESTIVAL_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: FESTIVAL_QUERY_KEY.ALL }),
  LIST: (search?: string) =>
    queryOptions({
      queryKey: FESTIVAL_QUERY_KEY.LIST(search),
      queryFn: () => getFestivalList(search),
    }),
  DETAIL: (festivalId: number) =>
    queryOptions({
      queryKey: FESTIVAL_QUERY_KEY.DETAIL(festivalId),
      queryFn: () => getFestivalDetail(festivalId),
    }),
};

export const getFestivalList = async (
  search?: string,
): Promise<AdminFestivalListQueryResponse> => {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  return get<AdminFestivalListQueryResponse>(
    `${END_POINT.GET_FESTIVALS}${params}`,
  );
};

export const getFestivalDetail = async (
  festivalId: number,
): Promise<AdminFestivalDetailResponse> => {
  return get<AdminFestivalDetailResponse>(
    END_POINT.GET_FESTIVAL_DETAIL(festivalId),
  );
};
