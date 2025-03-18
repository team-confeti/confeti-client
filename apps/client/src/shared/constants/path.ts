export const routePath = {
  LAYOUT: '/',
  // home-page
  ROOT: '/',
  // login-page
  LOGIN: '/login',
  // my-page
  MY: '/my',
  MY_ARTIST: 'artist',
  MY_CONFETI: 'confeti',
  MY_REQUIRE_LOGIN: 'require-login',
  // search-page
  SEARCH: '/search',
  // detail-page
  CONCERT: '/concert-detail/:typeId',
  FESTIVAL: '/festival-detail/:typeId',

  MYARTIST: '/my-artist',

  // time-table
  TIME_TABLE_OUTLET: '/timetable',
  TIME_TABLE_EMPTY_FESTIVAL: 'empty-festival',
  TIME_TABLE_REQUIRE_LOGIN: 'require-login',
  ADDFESTIVAL: 'add-festival',

  LOADING: '/loading',
  //privacy
  PRIVACY_CONFETI:
    'https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9',
  PRIVACY_PERSONAL:
    'https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a',
} as const;
