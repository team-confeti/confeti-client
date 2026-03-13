import type {
  TicketVendorListQueryResponse,
  TicketVendorResponse,
} from '@shared/types/api';

export const getTicketVendors = (
  ticketVendorListResponse: TicketVendorListQueryResponse | null | undefined,
): TicketVendorResponse[] =>
  Array.isArray(ticketVendorListResponse)
    ? ticketVendorListResponse
    : (ticketVendorListResponse?.ticketVendors ?? []);
