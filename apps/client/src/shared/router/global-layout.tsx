import * as Sentry from '@sentry/react';
import { Outlet } from 'react-router-dom';
import { Header } from '@confeti/design-system';
import { Suspense } from 'react';
import Loading from '@shared/pages/loading/loading';
import ScrollToTop from './scroll-to-top';
import ErroFallback from '@shared/pages/error/error';

export default function GlobalLayout() {
  return (
    <ScrollToTop>
      <Header />
      <Sentry.ErrorBoundary fallback={ErroFallback}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Sentry.ErrorBoundary>
    </ScrollToTop>
  );
}
