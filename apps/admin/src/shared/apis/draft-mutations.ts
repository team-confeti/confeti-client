import { mutationOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { del, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { DRAFT_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  CreateDraftRequest,
  DraftResponse,
  UpdateDraftRequest,
} from '@shared/types/api';

type PatchDraftParams = {
  draftId: number;
  request: UpdateDraftRequest;
};

export const DRAFT_MUTATION_OPTIONS = {
  POST_DRAFT: () =>
    mutationOptions({
      mutationKey: DRAFT_MUTATION_KEY.POST_DRAFT(),
      mutationFn: (request: CreateDraftRequest) => postDraft(request),
    }),
  PATCH_DRAFT: () =>
    mutationOptions({
      mutationKey: DRAFT_MUTATION_KEY.PATCH_DRAFT(),
      mutationFn: (params: PatchDraftParams) =>
        patchDraft(params.draftId, params.request),
    }),
  DELETE_DRAFT: () =>
    mutationOptions({
      mutationKey: DRAFT_MUTATION_KEY.DELETE_DRAFT(),
      mutationFn: (draftId: number) => deleteDraft(draftId),
    }),
};

export const postDraft = async (
  request: CreateDraftRequest,
): Promise<DraftResponse> => {
  const formData = new FormData();
  formData.append('performanceType', request.performanceType);
  formData.append('performanceData', request.performanceData);
  formData.append('posterImage', request.posterImage);
  if (request.logoImage) formData.append('logoImage', request.logoImage);

  const response = await post<BaseResponse<DraftResponse>>(
    END_POINT.POST_DRAFT,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data;
};

export const patchDraft = async (
  draftId: number,
  request: UpdateDraftRequest,
): Promise<DraftResponse> => {
  const formData = new FormData();
  if (request.performanceType)
    formData.append('performanceType', request.performanceType);
  if (request.status) formData.append('status', request.status);
  if (request.performanceData)
    formData.append('performanceData', request.performanceData);
  if (request.posterImage) formData.append('posterImage', request.posterImage);
  if (request.logoImage) formData.append('logoImage', request.logoImage);

  const response = await patch<BaseResponse<DraftResponse>>(
    END_POINT.PATCH_DRAFT(draftId),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data;
};

export const deleteDraft = async (draftId: number): Promise<void> => {
  await del<BaseResponse<void>>(END_POINT.DELETE_DRAFT(draftId));
};
