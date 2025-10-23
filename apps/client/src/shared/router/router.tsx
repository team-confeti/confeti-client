import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@shared/pages/error/error';
import { routePath } from '@shared/router/path';

import GlobalLayout from './global-layout';
import { authRoutes } from './routes/auth-routes';
import { fallbackRoutes } from './routes/fallback-routes';
import { globalRoutes } from './routes/global-routes';
import { layoutFreeRoutes } from './routes/layout-free-routes';
import { myPageRoutes } from './routes/my-page-routes';
import { timetableRoutes } from './routes/timetable-routes';

export const router = createBrowserRouter([
  {
    path: routePath.LAYOUT,
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...globalRoutes,
      ...authRoutes,
      ...myPageRoutes,
      ...timetableRoutes,
      ...fallbackRoutes,
    ],
  },
  {
    path: routePath.ONBOARDING,
    errorElement: <ErrorPage />,
    children: [...layoutFreeRoutes],
  },
]);
