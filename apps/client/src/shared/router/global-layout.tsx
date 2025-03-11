import { Header } from '@confeti/design-system';
import * as Sentry from '@sentry/react';
import ErrorFallback from '@shared/pages/error/error';
import Loading from '@shared/pages/loading/loading';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import ScrollToTop from './scroll-to-top';

export default function GlobalLayout() {
  return (
    <ScrollToTop>
      <Header />
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Sentry.ErrorBoundary>
    </ScrollToTop>
  );
}
