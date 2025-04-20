import { Route, Routes } from 'react-router-dom';

import { routePath } from '@shared/constants/path';

import GlobalLayout from './global-layout';
import {
  AddFestivalPage,
  ConcertDetailPage,
  DeleteAccountPage,
  ErrorPage,
  FestivalDetailPage,
  HomePage,
  LoginPage,
  MyArtistPage,
  MyConfetiPage,
  MyHistoryPage,
  MyPage,
  MyProfilePage,
  MyRecordPage,
  MyRequireLoginPage,
  OnboardingPage,
  RequireLoginPage,
  SearchPage,
  SettingPage,
  TimeTableLayout,
  TimeTablePage,
} from './lazy';
import { createProtectedRoute } from './protected-route';

export default function Router() {
  return (
    <Routes>
      <Route path={routePath.ONBOARDING} element={<OnboardingPage />} />
      <Route path={routePath.LOGIN} element={<LoginPage />} />
      <Route path={routePath.LAYOUT} element={<GlobalLayout />}>
        <Route path={routePath.ROOT} element={<HomePage />} />

        {/* MyPage */}
        <Route path={routePath.MY} element={<MyPage />}>
          <Route
            path=""
            element={createProtectedRoute(true, <MyProfilePage />)}
          />
          <Route
            path={routePath.MY_REQUIRE_LOGIN}
            element={<MyRequireLoginPage />}
          />
          <Route
            path={routePath.MY_ARTIST}
            element={createProtectedRoute(true, <MyArtistPage />)}
          />
          <Route
            path={routePath.MY_CONFETI}
            element={createProtectedRoute(true, <MyConfetiPage />)}
          />
          <Route
            path={routePath.MY_SETTING}
            element={createProtectedRoute(true, <SettingPage />)}
          />
          <Route
            path={routePath.MY_DELETE_ACCOUNT}
            element={createProtectedRoute(true, <DeleteAccountPage />)}
          />
        </Route>

        {/* MyRecord */}
        <Route path={routePath.MY_HISTORY} element={<MyHistoryPage />}>
          <Route
            path=""
            element={createProtectedRoute(true, <MyRecordPage />)}
          />
          <Route
            path={routePath.MY_HISTORY_REQUIRE_LOGIN}
            element={<RequireLoginPage />}
          />
        </Route>

        <Route path={routePath.SEARCH} element={<SearchPage />} />
        <Route path={routePath.CONCERT} element={<ConcertDetailPage />} />
        <Route path={routePath.FESTIVAL} element={<FestivalDetailPage />} />

        {/* TimeTable */}
        <Route path={routePath.TIME_TABLE_OUTLET} element={<TimeTableLayout />}>
          <Route
            path=""
            element={createProtectedRoute(true, <TimeTablePage />)}
          />
          <Route
            path={routePath.TIME_TABLE_REQUIRE_LOGIN}
            element={<RequireLoginPage />}
          />
          <Route
            path={routePath.ADD_FESTIVAL}
            element={createProtectedRoute(true, <AddFestivalPage />)}
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
