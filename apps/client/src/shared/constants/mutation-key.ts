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
