import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@shared/components';
import Deferred from '@shared/components/deferred/deferred';
import ErrorFallback from '@shared/pages/error/error';
import Loading from '@shared/pages/loading/loading';

import ScrollToTop from './scroll-to-top';

export default function GlobalLayout() {
  const location = useLocation();

  return (
    <ScrollToTop>
      <Header />
      <ErrorBoundary
        fallback={<ErrorFallback />}
        resetKeys={[location.pathname]}
      >
        <Suspense
          fallback={
            <Deferred>
              <Loading />
            </Deferred>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </ScrollToTop>
  );
}
