export const EVENT_QUERY_KEY = {
  ALL: ['events'],
  PENDING: () => [...EVENT_QUERY_KEY.ALL, 'pending'],
  FESTIVALS: () => [...EVENT_QUERY_KEY.ALL, 'festivals'],
  CONCERTS: () => [...EVENT_QUERY_KEY.ALL, 'concerts'],
  DETAIL: (eventId: number) => [...EVENT_QUERY_KEY.ALL, 'detail', eventId],
  TIMETABLE: (eventId: number) => [
    ...EVENT_QUERY_KEY.ALL,
    'timetable',
    eventId,
  ],
} as const;

export const ARTIST_QUERY_KEY = {
  ALL: ['artists'],
  LIST: () => [...ARTIST_QUERY_KEY.ALL, 'list'],
  DETAIL: (artistId: number) => [...ARTIST_QUERY_KEY.ALL, 'detail', artistId],
  SEARCH: (keyword: string) => [...ARTIST_QUERY_KEY.ALL, 'search', keyword],
} as const;

export const AGENCY_QUERY_KEY = {
  ALL: ['agencies'],
  LIST: () => [...AGENCY_QUERY_KEY.ALL, 'list'],
  DETAIL: (agencyId: number) => [...AGENCY_QUERY_KEY.ALL, 'detail', agencyId],
} as const;

export const DASHBOARD_QUERY_KEY = {
  ALL: ['dashboard'],
  STATS: () => [...DASHBOARD_QUERY_KEY.ALL, 'stats'],
} as const;

// 기존 코드 호환성을 위한 별칭
export const CONCERT_QUERY_KEY = {
  ALL: ['concerts'],
  CONCERT: (concertId: number) => [...CONCERT_QUERY_KEY.ALL, concertId],
} as const;

export const FESTIVAL_QUERY_KEY = {
  ALL: ['festivals'],
  FESTIVAL: (festivalId: number) => [...FESTIVAL_QUERY_KEY.ALL, festivalId],
} as const;
