import ErrorPage from '@shared/pages/error/error';

export const fallbackRoutes = [
  {
    path: '*',
    element: <ErrorPage />,
  },
];
