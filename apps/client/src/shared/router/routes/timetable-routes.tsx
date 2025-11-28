import RequireLoginPage from '@pages/auth/page/require-login';
import TimetableLayout from '@pages/timetable/page/timetable-layout';

import {
  AddFestivalPage,
  DeleteFestivalPage,
  NoUpcomingFestival,
} from '../lazy';
import { routePath } from '../path';
import { createProtectedRoute } from '../protected-route';

export const timetableSubRoutes = [
  {
    path: routePath.TIME_TABLE_OUTLET,
    element: <TimetableLayout />,
    children: [
      {
        path: routePath.TIME_TABLE_REQUIRE_LOGIN,
        element: <RequireLoginPage />,
      },
      {
        path: routePath.ADD_FESTIVAL,
        element: createProtectedRoute(true, <AddFestivalPage />),
      },
      {
        path: routePath.DELETE_FESTIVAL,
        element: createProtectedRoute(true, <DeleteFestivalPage />),
      },
      {
        path: routePath.NO_UPCOMING_FESTIVAL,
        element: createProtectedRoute(true, <NoUpcomingFestival />),
      },
    ],
  },
];
