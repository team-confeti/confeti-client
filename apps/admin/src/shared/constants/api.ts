export const END_POINT = {
  POST_SOCIAL_LOGIN: '/auth/login',
  POST_REISSUE_TOKEN: '/auth/reissue',

  GET_FESTIVALS: '/admin/performances/festivals',
  PUT_FESTIVAL: '/admin/performances/festivals',
  GET_FESTIVAL_DETAIL: (festivalId: number) =>
    `/admin/performances/festivals/${festivalId}`,

  GET_CONCERTS: '/admin/performances/concerts',
  PUT_CONCERT: '/admin/performances/concerts',
  GET_CONCERT_DETAIL: (concertId: number) =>
    `/admin/performances/concerts/${concertId}`,

  GET_DRAFTS: '/admin/performances/drafts',
  POST_DRAFT: '/admin/performances/drafts',
  GET_DRAFT_DETAIL: (draftId: number) =>
    `/admin/performances/drafts/${draftId}`,
  DELETE_DRAFT: (draftId: number) => `/admin/performances/drafts/${draftId}`,
  PATCH_DRAFT: (draftId: number) => `/admin/performances/drafts/${draftId}`,

  GET_TICKET_VENDORS: '/admin/ticket-vendors',
  POST_TICKET_VENDOR: '/admin/ticket-vendors',
  DELETE_TICKET_VENDOR: (ticketVendorId: number) =>
    `/admin/ticket-vendors/${ticketVendorId}`,
  PATCH_TICKET_VENDOR: (ticketVendorId: number) =>
    `/admin/ticket-vendors/${ticketVendorId}`,

  GET_ARTIST_SEARCH: '/admin/artists/search',
} as const;

export const STORAGE_KEY = {
  ADMIN_LOGIN_REDIRECT_PATH: 'adminLoginRedirectPath',
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
  SHORT: 1000 * 60 * 3,
  MEDIUM: 1000 * 60 * 5,
  LONG: 1000 * 60 * 10,
} as const;
