export const routePath = {
  // Home
  LAYOUT: '/',
  ROOT: '/',
  LOGIN: '/login',
  REDIRECT_KAKAO: '/auth',
  // Shared
  LOADING: '/loading',

  // My
  MY: '/my',
  MY_ARTIST: 'artist',
  MY_CONFETI: 'confeti',
  MY_REQUIRE_LOGIN: 'require-login',
  MY_SETTING: 'setting',
  MY_DELETE_ACCOUNT: '/my/delete-account',
  MY_EDIT_PROFILE: 'edit-profile',

  // MyHistory
  MY_HISTORY: '/my-history',
  MY_HISTORY_REQUIRE_LOGIN: 'require-login',
  MY_HISTORY_OVERVIEW: 'overview',
  MY_HISTORY_ADD_SETLIST: 'setlist/add-setlist',
  MY_HISTORY_ADD_SONGS: 'setlist/:setlistId/add-songs',
  MY_HISTORY_SETLIST_DETAIL: 'setlist-detail/:setlistId',
  MY_HISTORY_SETLIST_DETAIL_ABSOLUTE: '/my-history/setlist-detail/:setlistId',
  MY_HISTORY_ADD_SONGS_ABSOLUTE: '/my-history/setlist/:setlistId/add-songs',

  // Search
  SEARCH: '/search',

  // Detail
  CONCERT_DETAIL: '/concert-detail/:typeId',
  FESTIVAL_DETAIL: '/festival-detail/:typeId',

  // TimeTable
  TIME_TABLE_OUTLET: '/timetable',
  TIME_TABLE_EMPTY_FESTIVAL: 'empty-festival',
  TIME_TABLE_REQUIRE_LOGIN: 'require-login',
  ADD_FESTIVAL: 'add-festival',
  DELETE_FESTIVAL: 'delete-festival',

  // Onboarding
  ONBOARDING: '/onboarding',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
