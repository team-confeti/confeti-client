export const routePath = {
  // home-page
  ROOT: '/',
  // my-page
  MY: '/my',
  MY_ARTIST: 'artist',
  MY_CONFETI: 'confeti',
  MY_REQUIRE_LOGIN: 'require-login',
  // search-page
  SEARCH: '/search',
  // detail-page
  CONCERT: '/concert-detail/:concertId',
  FESTIVAL: '/festival-detail/:festivalId',

  MYARTIST: '/my-artist',

  // time-table
  TIME_TABLE_OUTLET: '/timetable',
  TIME_TABLE_EMPTY_FESTIVAL: 'empty-festival',
  ADDFESTIVAL: 'add-festival',

  LOADING: '/loading',
} as const;
