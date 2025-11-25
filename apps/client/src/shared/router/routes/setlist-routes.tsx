import MaintenancePage from '@pages/setlist/page/maintenance/maintenance-page';

import { AddSetlistPage, AddSongsPage, SetlistDetailPage } from '../lazy';
import { routePath } from '../path';
import { createProtectedRoute } from '../protected-route';

export const setlistRoutes = [
  {
    path: routePath.ADD_SETLIST,
    element: createProtectedRoute(true, <AddSetlistPage />),
  },
  {
    path: routePath.ADD_SONGS,
    element: createProtectedRoute(true, <AddSongsPage />),
  },
  {
    path: routePath.SETLIST_DETAIL,
    element: createProtectedRoute(true, <SetlistDetailPage />),
  },
  {
    path: routePath.SETLIST_MAINTENANCE,
    element: createProtectedRoute(false, <MaintenancePage />),
  },
];
