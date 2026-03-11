export const END_POINT = {
  // 인증
  POST_REISSUE_TOKEN: '/auth/reissue',

  // 공연 관리
  GET_PENDING_EVENTS: '/admin/events/pending',
  GET_FESTIVALS: '/admin/events/festivals',
  GET_CONCERTS: '/admin/events/concerts',
  GET_EVENT_DETAIL: (eventId: number) => `/admin/events/${eventId}`,
  POST_CREATE_EVENT: '/admin/events',
  PATCH_UPDATE_EVENT: (eventId: number) => `/admin/events/${eventId}`,
  DELETE_EVENT: (eventId: number) => `/admin/events/${eventId}`,
  PATCH_PUBLISH_EVENT: (eventId: number) => `/admin/events/${eventId}/publish`,

  // 아티스트 관리
  GET_ARTISTS: '/admin/artists',
  GET_ARTIST_DETAIL: (artistId: number) => `/admin/artists/${artistId}`,
  POST_CREATE_ARTIST: '/admin/artists',
  PATCH_UPDATE_ARTIST: (artistId: number) => `/admin/artists/${artistId}`,
  DELETE_ARTIST: (artistId: number) => `/admin/artists/${artistId}`,

  // 예매처 관리
  GET_AGENCIES: '/admin/agencies',
  GET_AGENCY_DETAIL: (agencyId: number) => `/admin/agencies/${agencyId}`,
  POST_CREATE_AGENCY: '/admin/agencies',
  PATCH_UPDATE_AGENCY: (agencyId: number) => `/admin/agencies/${agencyId}`,
  DELETE_AGENCY: (agencyId: number) => `/admin/agencies/${agencyId}`,

  // 타임테이블 관리
  GET_TIMETABLE: (eventId: number) => `/admin/events/${eventId}/timetable`,
  POST_CREATE_TIMETABLE_SLOT: (eventId: number) =>
    `/admin/events/${eventId}/timetable`,
  PATCH_UPDATE_TIMETABLE_SLOT: (eventId: number, slotId: string) =>
    `/admin/events/${eventId}/timetable/${slotId}`,
  DELETE_TIMETABLE_SLOT: (eventId: number, slotId: string) =>
    `/admin/events/${eventId}/timetable/${slotId}`,

  // 통계 및 대시보드
  GET_DASHBOARD_STATS: '/admin/dashboard/stats',

  // Concert & Festival 호환성 (기존 코드 지원)
  CONCERT: '/admin/events/concerts',
  CONCERT_DETAIL: (concertId: number) => `/admin/events/${concertId}`,
  FESTIVAL: '/admin/events/festivals',
  FESTIVAL_DETAIL: (festivalId: number) => `/admin/events/${festivalId}`,

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
