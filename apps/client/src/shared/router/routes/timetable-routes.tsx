import RequireLoginPage from '@pages/auth/page/require-login';
import TimetableLayout from '@pages/timetable/page/timetable-layout';
import TimeTablePage from '@pages/timetable/page/timetable-page';

import { AddFestivalPage, DeleteFestivalPage } from '../lazy';
import { routePath } from '../path';
import { createProtectedRoute } from '../protected-route';

export const timetableRoutes = [
  {
    path: routePath.TIME_TABLE_OUTLET,
    element: <TimetableLayout />,
    children: [
      {
        path: '',
        element: createProtectedRoute(true, <TimeTablePage />),
      },
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
    ],
  },
];
