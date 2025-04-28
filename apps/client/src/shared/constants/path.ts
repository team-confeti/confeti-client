export const routePath = {
  // Home
  LAYOUT: '/',
  ROOT: '/',
  LOGIN: '/login',

  // Shared
  LOADING: '/loading',

  // My
  MY: '/my',
  MY_ARTIST: 'artist',
  MY_CONFETI: 'confeti',
  MY_REQUIRE_LOGIN: 'require-login',
  MY_SETTING: 'setting',
  MY_DELETE_ACCOUNT: 'delete-account',

  // MyHistory
  MY_HISTORY: '/my-history',
  MY_HISTORY_REQUIRE_LOGIN: 'require-login',
  MY_HISTORY_OVERVIEW: 'overview',
  MY_HISTORY_ADD_SETLIST: 'setlist/add-setlist',

  // Search
  SEARCH: '/search',

  // Detail
  CONCERT: '/concert-detail/:typeId',
  FESTIVAL: '/festival-detail/:typeId',
  MYARTIST: '/my-artist',

  // TimeTable
  TIME_TABLE_OUTLET: '/timetable',
  TIME_TABLE_EMPTY_FESTIVAL: 'empty-festival',
  TIME_TABLE_REQUIRE_LOGIN: 'require-login',
  ADD_FESTIVAL: 'add-festival',
  DELETE_FESTIVAL: 'delete-festival',

  // Privacy
  PRIVACY_CONFETI:
    'https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9',
  PRIVACY_PERSONAL:
    'https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a',

  // Onboarding
  ONBOARDING: '/onboarding',
} as const;
