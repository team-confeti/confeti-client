import { createBrowserRouter } from 'react-router-dom';
import ConcertPage from '@pages/concert/concert-page';
import DashboardPage from '@pages/dashboard/dashboard-page';
import FestivalPage from '@pages/festival/festival-page';
import HomePage from '@pages/home/home-page';

import Layout from '@shared/components/layout/layout';
import { PATH } from '@shared/constants/path';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.CONCERT,
        element: <ConcertPage />,
      },
      {
        path: PATH.FESTIVAL,
        element: <FestivalPage />,
      },
      {
        path: PATH.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
