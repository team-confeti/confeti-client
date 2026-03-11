export const FESTIVAL_MUTATION_KEY = {
  PUT_FESTIVAL: () => ['put-festival'],
} as const;

export const CONCERT_MUTATION_KEY = {
  PUT_CONCERT: () => ['put-concert'],
} as const;

export const DRAFT_MUTATION_KEY = {
  POST_DRAFT: () => ['post-draft'],
  PATCH_DRAFT: () => ['patch-draft'],
  DELETE_DRAFT: () => ['delete-draft'],
} as const;

export const TICKET_VENDOR_MUTATION_KEY = {
  POST_TICKET_VENDOR: () => ['post-ticket-vendor'],
  PATCH_TICKET_VENDOR: () => ['patch-ticket-vendor'],
  DELETE_TICKET_VENDOR: () => ['delete-ticket-vendor'],
} as const;
