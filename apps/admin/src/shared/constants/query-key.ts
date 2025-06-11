export const CONCERT_QUERY_KEY = {
  ALL: ['concerts'],
  CONCERT: (concertId: number) => [...CONCERT_QUERY_KEY.ALL, concertId],
} as const;

export const FESTIVAL_QUERY_KEY = {
  ALL: ['festivals'],
  FESTIVAL: (festivalId: number) => [...FESTIVAL_QUERY_KEY.ALL, festivalId],
} as const;
