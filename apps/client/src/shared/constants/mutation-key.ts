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
  POST_ADD_PERFORMANCE_TO_SETLIST: () => ['post-add-performance-to-setlist'],
  POST_ADD_MUSIC_TO_SETLIST: () => ['post-add-music-to-setlist'],
  PATCH_COMPLETE_EDIT_SETLIST: () => ['patch-complete-edit-setlist'],
  PATCH_REORDER_SETLIST: () => ['patch-reorder-setlist'],
  DELETE_MUSIC_FROM_SETLIST: () => ['delete-music-from-setlist'],
  DELETE_CANCEL_EDIT_SETLIST: () => ['delete-cancel-edit-setlist'],
} as const;

export const ONBOARD_MUTATION_KEY = {
  ARTIST_RELATED_ARTIST: (artistId: string) => [
    'artist-related-artist',
    artistId,
  ],
  SELECTED_ARTIST: (artistId: string) => ['selected-artist', artistId],
  AUTH_ONBOARD: () => ['auth-onboard'],
} as const;
