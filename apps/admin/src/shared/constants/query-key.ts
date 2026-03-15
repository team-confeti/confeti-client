export const FESTIVAL_QUERY_KEY = {
  ALL: ['festivals'],
  LIST: (search?: string) => [...FESTIVAL_QUERY_KEY.ALL, 'list', search ?? ''],
  DETAIL: (festivalId: number) => [
    ...FESTIVAL_QUERY_KEY.ALL,
    'detail',
    festivalId,
  ],
} as const;

export const CONCERT_QUERY_KEY = {
  ALL: ['concerts'],
  LIST: (search?: string) => [...CONCERT_QUERY_KEY.ALL, 'list', search ?? ''],
  DETAIL: (concertId: number) => [
    ...CONCERT_QUERY_KEY.ALL,
    'detail',
    concertId,
  ],
} as const;

export const DRAFT_QUERY_KEY = {
  ALL: ['drafts'],
  LIST: (search?: string) => [...DRAFT_QUERY_KEY.ALL, 'list', search ?? ''],
  DETAIL: (draftId: number) => [...DRAFT_QUERY_KEY.ALL, 'detail', draftId],
} as const;

export const TICKET_VENDOR_QUERY_KEY = {
  ALL: ['ticket-vendors'],
  LIST: (search?: string) => [
    ...TICKET_VENDOR_QUERY_KEY.ALL,
    'list',
    search ?? '',
  ],
} as const;

export const ARTIST_QUERY_KEY = {
  ALL: ['artists'],
  SEARCH: (term: string) => [...ARTIST_QUERY_KEY.ALL, 'search', term],
} as const;
