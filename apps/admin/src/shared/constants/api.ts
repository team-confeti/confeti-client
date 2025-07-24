export const END_POINT = {
  CONCERT: '/admin/performance/concerts',
  FESTIVAL: '/admin/performance/festivals',
  CONCERT_DETAIL: (concertId: number) =>
    `/admin/performance/concerts/${concertId}`,
  FESTIVAL_DETAIL: (festivalId: number) =>
    `/admin/performance/festivals/${festivalId}`,
} as const;
