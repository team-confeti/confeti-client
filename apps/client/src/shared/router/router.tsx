import { Route, Routes } from 'react-router-dom';
import RedirectKakao from '@pages/auth/page/redirect-kakao';
import RequireLoginPage from '@pages/auth/page/require-login';
import HomePage from '@pages/home/page/home-page';
import MyRequireLoginPage from '@pages/my/page/auth/require-login';
import EditProfile from '@pages/my/page/edit/edit-profile';
import MyPage from '@pages/my/page/my-page';
import MyHistoryPage from '@pages/my-history/page/my-history';
import MyHistoryOverviewPage from '@pages/my-history/page/overview/my-history-overview-page';
import TimeTableLayout from '@pages/time-table/page/time-table-layout';
import TimeTablePage from '@pages/time-table/page/time-table-page';

import ErrorPage from '@shared/pages/error/error';
import { routePath } from '@shared/router/path';

import GlobalLayout from './global-layout';
import {
  AddFestivalPage,
  AddSetlistPage,
  AddSongsPage,
  ConcertDetailPage,
  DeleteAccountPage,
  DeleteFestivalPage,
  FestivalDetailPage,
  LoginPage,
  MyArtistPage,
  MyConfetiPage,
  MyProfilePage,
  MyRecordPage,
  OnboardingPage,
  SearchPage,
  SetlistDetailPage,
  SettingPage,
} from './lazy';
import { createProtectedRoute } from './protected-route';

export default function Router() {
  return (
    <Routes>
      <Route path={routePath.ONBOARDING} element={<OnboardingPage />} />
      <Route path={routePath.LOGIN} element={<LoginPage />} />
      <Route path={routePath.REDIRECT_KAKAO} element={<RedirectKakao />} />
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
          <Route
            path={routePath.MY_EDIT_PROFILE}
            element={createProtectedRoute(true, <EditProfile />)}
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
          <Route
            path={routePath.MY_HISTORY_OVERVIEW}
            element={<MyHistoryOverviewPage />}
          />
          <Route
            path={routePath.MY_HISTORY_ADD_SETLIST}
            element={createProtectedRoute(true, <AddSetlistPage />)}
          />
          <Route
            path={routePath.MY_HISTORY_ADD_SONGS}
            element={createProtectedRoute(true, <AddSongsPage />)}
          />
          <Route
            path={routePath.MY_HISTORY_SETLIST_DETAIL}
            element={createProtectedRoute(true, <SetlistDetailPage />)}
          />
        </Route>

        <Route path={routePath.SEARCH} element={<SearchPage />} />
        <Route
          path={routePath.CONCERT_DETAIL}
          element={<ConcertDetailPage />}
        />
        <Route
          path={routePath.FESTIVAL_DETAIL}
          element={<FestivalDetailPage />}
        />

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
          <Route
            path={routePath.DELETE_FESTIVAL}
            element={createProtectedRoute(true, <DeleteFestivalPage />)}
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
