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
  ADDFESTIVAL: '/add-festival',

  // time-table
  TIME_TABLE: '/timetable',
} as const;
