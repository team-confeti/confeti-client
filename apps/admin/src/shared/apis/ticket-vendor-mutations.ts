import { mutationOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { del, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { TICKET_VENDOR_MUTATION_KEY } from '@shared/constants/mutation-key';
import {
  CreateTicketVendorRequest,
  TicketVendorResponse,
  UpdateTicketVendorRequest,
} from '@shared/types/api';

type PatchTicketVendorParams = {
  ticketVendorId: number;
  request: UpdateTicketVendorRequest;
};

export const TICKET_VENDOR_MUTATION_OPTIONS = {
  POST_TICKET_VENDOR: () =>
    mutationOptions({
      mutationKey: TICKET_VENDOR_MUTATION_KEY.POST_TICKET_VENDOR(),
      mutationFn: (request: CreateTicketVendorRequest) =>
        postTicketVendor(request),
    }),
  PATCH_TICKET_VENDOR: () =>
    mutationOptions({
      mutationKey: TICKET_VENDOR_MUTATION_KEY.PATCH_TICKET_VENDOR(),
      mutationFn: (params: PatchTicketVendorParams) =>
        patchTicketVendor(params.ticketVendorId, params.request),
    }),
  DELETE_TICKET_VENDOR: () =>
    mutationOptions({
      mutationKey: TICKET_VENDOR_MUTATION_KEY.DELETE_TICKET_VENDOR(),
      mutationFn: (ticketVendorId: number) =>
        deleteTicketVendor(ticketVendorId),
    }),
};

export const postTicketVendor = async (
  request: CreateTicketVendorRequest,
): Promise<TicketVendorResponse> => {
  const formData = new FormData();
  formData.append('name', request.name);
  formData.append('logoImage', request.logoImage);

  const response = await post<BaseResponse<TicketVendorResponse>>(
    END_POINT.POST_TICKET_VENDOR,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data;
};

export const patchTicketVendor = async (
  ticketVendorId: number,
  request: UpdateTicketVendorRequest,
): Promise<TicketVendorResponse> => {
  const formData = new FormData();
  if (request.name) formData.append('name', request.name);
  if (request.logoImage) formData.append('logoImage', request.logoImage);

  const response = await patch<BaseResponse<TicketVendorResponse>>(
    END_POINT.PATCH_TICKET_VENDOR(ticketVendorId),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data;
};

export const deleteTicketVendor = async (
  ticketVendorId: number,
): Promise<void> => {
  await del<BaseResponse<void>>(END_POINT.DELETE_TICKET_VENDOR(ticketVendorId));
};
