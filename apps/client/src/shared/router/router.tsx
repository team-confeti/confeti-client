import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@shared/pages/error/error';
import { routePath } from '@shared/router/path';

import BasicLayout from './basic-layout';
import GlobalLayout from './global-layout';
import { authRoutes } from './routes/auth-routes';
import { fallbackRoutes } from './routes/fallback-routes';
import { globalRoutes } from './routes/global-routes';
import {
  onboardingRoute,
  timetableMainRoute,
} from './routes/layout-free-routes';
import { myPageRoutes } from './routes/my-page-routes';
import { setlistRoutes } from './routes/setlist-routes';
import { timetableSubRoutes } from './routes/timetable-routes';

export const router = createBrowserRouter([
  {
    path: routePath.ONBOARDING,
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: onboardingRoute.element }],
  },
  {
    path: routePath.TIME_TABLE_OUTLET,
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: timetableMainRoute.element }],
  },
  {
    path: routePath.LAYOUT,
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...globalRoutes,
      ...authRoutes,
      ...myPageRoutes,
      ...timetableSubRoutes,
      ...fallbackRoutes,
      ...setlistRoutes,
    ],
  },
]);
