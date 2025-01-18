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
  TimeTable,
  EmptyFestivalPage,
} from './lazy';
import { routePath } from '@shared/constants/path';
import { createProtectedRoute } from './protected-route';

export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route element={<GlobalLayout />}>
          {/* 루트 경로 */}
          <Route path={routePath.ROOT} element={<HomePage />} />

          {/* MyPage 중첩 라우터 */}
          <Route path={routePath.MY} element={<MyPage />}>
            <Route
              path=""
              element={createProtectedRoute(true, <MyProfilePage />)}
            />
            <Route
              path={routePath.MY_REQUIRE_LOGIN}
              element={<RequireLoginPage />}
            />
            <Route
              path={routePath.MY_ARTIST}
              element={createProtectedRoute(true, <MyArtistPage />)}
            />
            <Route
              path={routePath.MY_CONFETI}
              element={createProtectedRoute(true, <MyConfetiPage />)}
            />
          </Route>

          {/* 검색 및 상세 페이지 */}
          <Route path={routePath.SEARCH} element={<SearchPage />} />
          <Route path={routePath.CONCERT} element={<ConcertDetailPage />} />
          <Route path={routePath.FESTIVAL} element={<FestivalDetailPage />} />
          <Route path={routePath.TIME_TABLE} element={<TimeTable />} />
          <Route
            path={routePath.TIME_TABLE_EMPTY_FESTIVAL}
            element={<EmptyFestivalPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
