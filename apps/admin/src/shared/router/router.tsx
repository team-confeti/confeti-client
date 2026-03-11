import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '@shared/components/layout/layout';
import { PATH } from '@shared/constants/path';

import AgencyPage from '@pages/agency/agency-page';
import ConcertPage from '@pages/concert/concert-page';
import DashboardPage from '@pages/dashboard/page/dashboard-page';
import EventEditorPage from '@pages/event-editor/event-editor-page';
import FestivalPage from '@pages/festival/festival-page';
import PendingPage from '@pages/pending/pending-page';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={PATH.DASHBOARD} replace />,
      },
      {
        path: PATH.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: PATH.PENDING,
        element: <PendingPage />,
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
        path: PATH.AGENCY,
        element: <AgencyPage />,
      },
      {
        path: PATH.EVENT_EDITOR,
        element: <EventEditorPage />,
      },
      {
        path: PATH.EVENTS,
        element: <EventEditorPage />,
      },
    ],
  },
]);

export default router;
