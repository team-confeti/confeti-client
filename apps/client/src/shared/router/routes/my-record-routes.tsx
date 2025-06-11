import RequireLoginPage from '@pages/auth/page/require-login';
import MyHistoryPage from '@pages/my-history/page/my-history';
import MyHistoryOverviewPage from '@pages/my-history/page/overview/my-history-overview-page';

import {
  AddSetlistPage,
  AddSongsPage,
  MyRecordPage,
  SetlistDetailPage,
} from '../lazy';
import { routePath } from '../path';
import { createProtectedRoute } from '../protected-route';

export const myRecordRoutes = [
  {
    path: routePath.MY_HISTORY,
    element: <MyHistoryPage />,
    children: [
      {
        path: '',
        element: createProtectedRoute(true, <MyRecordPage />),
      },
      {
        path: routePath.MY_HISTORY_REQUIRE_LOGIN,
        element: <RequireLoginPage />,
      },
      {
        path: routePath.MY_HISTORY_OVERVIEW,
        element: <MyHistoryOverviewPage />,
      },
      {
        path: routePath.MY_HISTORY_ADD_SETLIST,
        element: createProtectedRoute(true, <AddSetlistPage />),
      },
      {
        path: routePath.MY_HISTORY_ADD_SONGS,
        element: createProtectedRoute(true, <AddSongsPage />),
      },
      {
        path: routePath.MY_HISTORY_SETLIST_DETAIL,
        element: createProtectedRoute(true, <SetlistDetailPage />),
      },
    ],
  },
];
