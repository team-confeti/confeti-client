import { createBrowserRouter } from 'react-router-dom';
import ConcertPage from '@pages/concert/concert-page';
import DashboardPage from '@pages/dashboard/dashboard-page';
import EditConcertPage from '@pages/dashboard/page/edit-concert-page';
import EditFestivalPage from '@pages/dashboard/page/edit-festival-page';
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
      {
        path: PATH.EDIT_CONCERT,
        element: <EditConcertPage />,
      },
      {
        path: PATH.EDIT_FESTIVAL,
        element: <EditFestivalPage />,
      },
    ],
  },
]);

export default router;
