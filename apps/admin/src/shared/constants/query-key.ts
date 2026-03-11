export const FESTIVAL_QUERY_KEY = {
  ALL: ['festivals'],
  LIST: () => [...FESTIVAL_QUERY_KEY.ALL, 'list'],
  DETAIL: (festivalId: number) => [
    ...FESTIVAL_QUERY_KEY.ALL,
    'detail',
    festivalId,
  ],
} as const;

export const CONCERT_QUERY_KEY = {
  ALL: ['concerts'],
  LIST: () => [...CONCERT_QUERY_KEY.ALL, 'list'],
  DETAIL: (concertId: number) => [
    ...CONCERT_QUERY_KEY.ALL,
    'detail',
    concertId,
  ],
} as const;

export const DRAFT_QUERY_KEY = {
  ALL: ['drafts'],
  LIST: () => [...DRAFT_QUERY_KEY.ALL, 'list'],
  DETAIL: (draftId: number) => [...DRAFT_QUERY_KEY.ALL, 'detail', draftId],
} as const;

export const TICKET_VENDOR_QUERY_KEY = {
  ALL: ['ticket-vendors'],
  LIST: () => [...TICKET_VENDOR_QUERY_KEY.ALL, 'list'],
} as const;

export const ARTIST_QUERY_KEY = {
  ALL: ['artists'],
  SEARCH: (term: string) => [...ARTIST_QUERY_KEY.ALL, 'search', term],
} as const;
