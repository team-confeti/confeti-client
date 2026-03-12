import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { TICKET_VENDOR_QUERY_KEY } from '@shared/constants/query-key';
import { TicketVendorListResponse } from '@shared/types/api';

export const TICKET_VENDOR_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: TICKET_VENDOR_QUERY_KEY.ALL }),
  LIST: () =>
    queryOptions({
      queryKey: TICKET_VENDOR_QUERY_KEY.LIST(),
      queryFn: getTicketVendorList,
    }),
};

export const getTicketVendorList =
  async (): Promise<TicketVendorListResponse> => {
    return get<TicketVendorListResponse>(END_POINT.GET_TICKET_VENDORS);
  };
