export const PERFORMANCE_QUERY_KEY = {
  ALL: ['performances'],
  PENDING: () => [...PERFORMANCE_QUERY_KEY.ALL, 'pending'],
  FESTIVALS: () => [...PERFORMANCE_QUERY_KEY.ALL, 'festivals'],
  CONCERTS: () => [...PERFORMANCE_QUERY_KEY.ALL, 'concerts'],
  DETAIL: (performanceId: number) => [
    ...PERFORMANCE_QUERY_KEY.ALL,
    'detail',
    performanceId,
  ],
  TIMETABLE: (performanceId: number) => [
    ...PERFORMANCE_QUERY_KEY.ALL,
    'timetable',
    performanceId,
  ],
} as const;

export const ARTIST_QUERY_KEY = {
  ALL: ['artists'],
  LIST: () => [...ARTIST_QUERY_KEY.ALL, 'list'],
  DETAIL: (artistId: number) => [...ARTIST_QUERY_KEY.ALL, 'detail', artistId],
  SEARCH: (keyword: string) => [...ARTIST_QUERY_KEY.ALL, 'search', keyword],
} as const;

export const TICKETING_PLATFORM_QUERY_KEY = {
  ALL: ['ticketing-platforms'],
  LIST: () => [...TICKETING_PLATFORM_QUERY_KEY.ALL, 'list'],
  DETAIL: (ticketingPlatformId: number) => [
    ...TICKETING_PLATFORM_QUERY_KEY.ALL,
    'detail',
    ticketingPlatformId,
  ],
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
