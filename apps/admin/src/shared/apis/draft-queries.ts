import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { DRAFT_QUERY_KEY } from '@shared/constants/query-key';
import { DraftDetailResponse, DraftListQueryResponse } from '@shared/types/api';

export const DRAFT_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: DRAFT_QUERY_KEY.ALL }),
  LIST: (search?: string) =>
    queryOptions({
      queryKey: DRAFT_QUERY_KEY.LIST(search),
      queryFn: () => getDraftList(search),
    }),
  DETAIL: (draftId: number) =>
    queryOptions({
      queryKey: DRAFT_QUERY_KEY.DETAIL(draftId),
      queryFn: () => getDraftDetail(draftId),
    }),
};

export const getDraftList = async (
  search?: string,
): Promise<DraftListQueryResponse> => {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  return get<DraftListQueryResponse>(`${END_POINT.GET_DRAFTS}${params}`);
};

export const getDraftDetail = async (
  draftId: number,
): Promise<DraftDetailResponse> => {
  return get<DraftDetailResponse>(END_POINT.GET_DRAFT_DETAIL(draftId));
};
