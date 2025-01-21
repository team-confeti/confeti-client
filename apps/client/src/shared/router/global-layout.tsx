import { Outlet } from 'react-router-dom';
import { Header } from '@confeti/design-system';
import { Suspense } from 'react';
import Loading from '@shared/pages/loading/loading';

export default function GlobalLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
