import { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { Outlet } from 'react-router-dom';

import { Header } from '@confeti/design-system';

import ErrorFallback from '@shared/pages/error/error';
import Loading from '@shared/pages/loading/loading';

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
