import { queryOptions } from '@tanstack/react-query';

import { get } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { TICKET_VENDOR_QUERY_KEY } from '@shared/constants/query-key';
import { TicketVendorListQueryResponse } from '@shared/types/api';

export const TICKET_VENDOR_QUERY_OPTIONS = {
  ALL: () => queryOptions({ queryKey: TICKET_VENDOR_QUERY_KEY.ALL }),
  LIST: (search?: string) =>
    queryOptions({
      queryKey: TICKET_VENDOR_QUERY_KEY.LIST(search),
      queryFn: () => getTicketVendorList(search),
    }),
};

export const getTicketVendorList = async (
  search?: string,
): Promise<TicketVendorListQueryResponse> => {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  return get<TicketVendorListQueryResponse>(
    `${END_POINT.GET_TICKET_VENDORS}${params}`,
  );
};
