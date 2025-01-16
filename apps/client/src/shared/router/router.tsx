import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalLayout from './global-layout';
import {
  ConcertDetailPage,
  FestivalDetailPage,
  HomePage,
  MyConfetiPage,
  MyArtistPage,
  MyPage,
  SearchPage,
  RequireLoginPage,
  MyProfilePage,
} from './lazy';
import { routePath } from '@shared/constants/path';

export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path={routePath.ROOT} element={<HomePage />} />
          <Route path={routePath.MY} element={<MyPage />}>
            <Route path="" element={<MyProfilePage />} />
            <Route
              path={routePath.REQUIRE_LOGIN}
              element={<RequireLoginPage />}
            />
            <Route path={routePath.MY_ARTIST} element={<MyArtistPage />} />
            <Route path={routePath.MY_CONFETI} element={<MyConfetiPage />} />
          </Route>
          <Route path={routePath.SEARCH} element={<SearchPage />} />
          <Route path={routePath.CONCERT} element={<ConcertDetailPage />} />
          <Route path={routePath.FESTIVAL} element={<FestivalDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
