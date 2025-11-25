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
  MY_TIMETABLE: 'timetable',
  MY_REQUIRE_LOGIN: 'require-login',
  MY_SETTING: 'setting',
  MY_DELETE_ACCOUNT: '/my/delete-account',
  MY_EDIT_PROFILE: 'edit-profile',
  MY_OVERVIEW: 'overview',
  MY_TIMETABLE_DETAIL: '/my/timetable/:id',
  MY_SETLIST_DETAIL_ABSOLUTE: '/my/setlist-detail/:setlistId',
  MY_ADD_SONGS_ABSOLUTE: '/my/setlist/:setlistId/add-songs',

  //Setlist
  ADD_SETLIST: 'setlist/add-setlist',
  ADD_SONGS: 'setlist/:setlistId/add-songs',
  SETLIST_DETAIL: 'setlist-detail/:setlistId',
  SETLIST_MAINTENANCE: '/setlist/maintenance',

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
  NO_UPCOMING_FESTIVAL: 'no-upcoming-festival',

  // Onboarding
  ONBOARDING: '/onboarding',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
