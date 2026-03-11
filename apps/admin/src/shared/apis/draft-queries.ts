import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { DRAFT_QUERY_KEY } from '@shared/constants/query-key';
import { DraftDetailResponse, DraftListResponse } from '@shared/types/api';

export const DRAFT_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: DRAFT_QUERY_KEY.ALL }),
  LIST: () =>
    queryOptions({
      queryKey: DRAFT_QUERY_KEY.LIST(),
      queryFn: getDraftList,
    }),
  DETAIL: (draftId: number) =>
    queryOptions({
      queryKey: DRAFT_QUERY_KEY.DETAIL(draftId),
      queryFn: () => getDraftDetail(draftId),
    }),
};

export const getDraftList = async (): Promise<DraftListResponse> => {
  return get<DraftListResponse>(END_POINT.GET_DRAFTS);
};

export const getDraftDetail = async (
  draftId: number,
): Promise<DraftDetailResponse> => {
  return get<DraftDetailResponse>(END_POINT.GET_DRAFT_DETAIL(draftId));
};
