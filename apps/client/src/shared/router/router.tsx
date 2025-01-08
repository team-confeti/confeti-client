import { Suspense } from 'react';
import { HomePage } from './lazy';
import { Route, Routes } from 'react-router-dom';
import GlobalLayout from './global-layout';
import { routePath } from '@shared/constants/path';

export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path={routePath.ROOT} element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
