import { Outlet } from 'react-router-dom';
import { Header } from '@confeti/design-system';
import { Suspense } from 'react';
import Loading from '@shared/pages/loading/loading';
import ScrollToTop from './scroll-to-top';
import { ErrorBoundary } from 'react-error-boundary';
import ErroFallback from '@shared/pages/error/error';

export default function GlobalLayout() {
  return (
    <ScrollToTop>
      <Header />
      <ErrorBoundary FallbackComponent={ErroFallback}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </ScrollToTop>
  );
}
