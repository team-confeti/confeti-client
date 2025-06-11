import HomePage from '@pages/home/page/home-page';

import { ConcertDetailPage, FestivalDetailPage, SearchPage } from '../lazy';
import { routePath } from '../path';

export const globalRoutes = [
  {
    path: routePath.ROOT,
    element: <HomePage />,
  },
  {
    path: routePath.SEARCH,
    element: <SearchPage />,
  },
  {
    path: routePath.CONCERT_DETAIL,
    element: <ConcertDetailPage />,
  },
  {
    path: routePath.FESTIVAL_DETAIL,
    element: <FestivalDetailPage />,
  },
];
