export const END_POINT = {
  // 인증
  POST_REISSUE_TOKEN: '/auth/reissue',

  // 공연 관리
  GET_PENDING_PERFORMANCES: '/admin/performances/pending',
  GET_FESTIVALS: '/admin/performances/festivals',
  GET_CONCERTS: '/admin/performances/concerts',
  GET_PERFORMANCE_DETAIL: (performanceId: number) =>
    `/admin/performances/${performanceId}`,
  POST_CREATE_PERFORMANCE: '/admin/performances',
  PATCH_UPDATE_PERFORMANCE: (performanceId: number) =>
    `/admin/performances/${performanceId}`,
  DELETE_PERFORMANCE: (performanceId: number) =>
    `/admin/performances/${performanceId}`,
  PATCH_PUBLISH_PERFORMANCE: (performanceId: number) =>
    `/admin/performances/${performanceId}/publish`,

  // 아티스트 관리
  GET_ARTISTS: '/admin/artists',
  GET_ARTIST_DETAIL: (artistId: number) => `/admin/artists/${artistId}`,
  POST_CREATE_ARTIST: '/admin/artists',
  PATCH_UPDATE_ARTIST: (artistId: number) => `/admin/artists/${artistId}`,
  DELETE_ARTIST: (artistId: number) => `/admin/artists/${artistId}`,

  // 예매처 관리
  GET_TICKETING_PLATFORMS: '/admin/ticketing-platforms',
  GET_TICKETING_PLATFORM_DETAIL: (ticketingPlatformId: number) =>
    `/admin/ticketing-platforms/${ticketingPlatformId}`,
  POST_CREATE_TICKETING_PLATFORM: '/admin/ticketing-platforms',
  PATCH_UPDATE_TICKETING_PLATFORM: (ticketingPlatformId: number) =>
    `/admin/ticketing-platforms/${ticketingPlatformId}`,
  DELETE_TICKETING_PLATFORM: (ticketingPlatformId: number) =>
    `/admin/ticketing-platforms/${ticketingPlatformId}`,

  // 타임테이블 관리
  GET_TIMETABLE: (performanceId: number) =>
    `/admin/performances/${performanceId}/timetable`,
  POST_CREATE_TIMETABLE_SLOT: (performanceId: number) =>
    `/admin/performances/${performanceId}/timetable`,
  PATCH_UPDATE_TIMETABLE_SLOT: (performanceId: number, slotId: string) =>
    `/admin/performances/${performanceId}/timetable/${slotId}`,
  DELETE_TIMETABLE_SLOT: (performanceId: number, slotId: string) =>
    `/admin/performances/${performanceId}/timetable/${slotId}`,

  // 통계 및 대시보드
  GET_DASHBOARD_STATS: '/admin/dashboard/stats',

  // Concert & Festival 호환성 (기존 코드 지원)
  CONCERT: '/admin/performances/concerts',
  CONCERT_DETAIL: (concertId: number) => `/admin/performances/${concertId}`,
  FESTIVAL: '/admin/performances/festivals',
  FESTIVAL_DETAIL: (festivalId: number) => `/admin/performances/${festivalId}`,

  // 파일 업로드
  POST_UPLOAD_IMAGE: '/admin/upload/image',
  POST_UPLOAD_LOGO: '/admin/upload/logo',
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const CACHE_TIME = {
  SHORT: 1000 * 60 * 3, // 3분
  MEDIUM: 1000 * 60 * 5, // 5분
  LONG: 1000 * 60 * 10, // 10분
} as const;
