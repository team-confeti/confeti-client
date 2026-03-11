import { queryOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

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
  const response = await get<BaseResponse<DraftListResponse>>(
    END_POINT.GET_DRAFTS,
  );
  return response.data;
};

export const getDraftDetail = async (
  draftId: number,
): Promise<DraftDetailResponse> => {
  const response = await get<BaseResponse<DraftDetailResponse>>(
    END_POINT.GET_DRAFT_DETAIL(draftId),
  );
  return response.data;
};
