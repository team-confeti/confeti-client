import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import ErrorFallback from '@shared/pages/error/error';
import Loading from '@shared/pages/loading/loading';

import ScrollToTop from './scroll-to-top';

export default function BasicLayout() {
  const location = useLocation();

  return (
    <ScrollToTop>
      <ErrorBoundary
        fallback={<ErrorFallback />}
        resetKeys={[location.pathname]}
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </ScrollToTop>
  );
}
