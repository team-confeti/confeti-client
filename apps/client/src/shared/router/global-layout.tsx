import { Outlet } from 'react-router-dom';
import { Header } from '@confeti/design-system';
import { Suspense } from 'react';
import Loading from '@shared/pages/loading/loading';
import ScrollToTop from './scroll-to-top';

export default function GlobalLayout() {
  return (
    <ScrollToTop>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </ScrollToTop>
  );
}
