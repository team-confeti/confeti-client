export const USER_MUTATION_KEY = {
  PATCH_PROFILE: () => ['patch-profile'],
} as const;

export const AUTH_MUTATION_KEY = {
  POST_SOCIAL_LOGIN: () => ['post-social-login'],
  POST_LOGOUT: () => ['post-logout'],
  DELETE_ACCOUNT: () => ['delete-account'],
} as const;

export const TIMETABLE_MUTATION_KEY = {
  POST_TIMETABLE: () => ['post-timetable'],
  DELETE_TIMETABLE: () => ['delete-timetable'],
  PATCH_TIMETABLE: () => ['patch-timetable'],
} as const;

export const SETLIST_MUTATION_KEY = {
  POST_START_EDIT_SETLIST: () => ['post-start-edit-setlist'],
  POST_ADD_PERFORMANCE_TO_SET_LIST: () => ['post-add-performance-to-set-list'],
  POST_ADD_MUSIC_TO_SET_LIST: () => ['post-add-music-to-set-list'],
  PATCH_COMPLETE_EDIT_SETLIST: () => ['patch-complete-edit-setlist'],
  PATCH_REORDER_SET_LIST: () => ['patch-reorder-set-list'],
  DELETE_MUSIC_FROM_SET_LIST: () => ['delete-music-from-set-list'],
  DELETE_CANCEL_EDIT_SETLIST: () => ['delete-cancel-edit-setlist'],
} as const;
