import { createBrowserRouter, Navigate } from 'react-router-dom';

import ErrorFallback from '@shared/components/error-fallback/error-fallback';
import Layout from '@shared/components/layout/layout';
import { PATH } from '@shared/constants/path';

import AnalyticsEventsPage from '@pages/analytics-events/page/analytics-events-page';
import ConcertPage from '@pages/concert/concert-page';
import DashboardPage from '@pages/dashboard/page/dashboard-page';
import FestivalPage from '@pages/festival/festival-page';
import PendingPage from '@pages/pending/pending-page';
import PerformanceEditorPage from '@pages/performance-editor/performance-editor-page';
import TicketingPlatformPage from '@pages/ticketing-platform/ticketing-platform-page';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <ErrorFallback
        error={new Error('페이지를 불러오는 중 오류가 발생했습니다.')}
        resetErrorBoundary={() => window.location.reload()}
      />
    ),
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
        path: PATH.ANALYTICS_EVENTS,
        element: <AnalyticsEventsPage />,
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
        path: PATH.TICKETING_PLATFORM,
        element: <TicketingPlatformPage />,
      },
      {
        path: PATH.PERFORMANCE_EDITOR,
        element: <PerformanceEditorPage />,
      },
      {
        path: PATH.PERFORMANCES,
        element: <PerformanceEditorPage />,
      },
    ],
  },
]);

export default router;
