import { createBrowserRouter } from 'react-router-dom';
import RedirectKakao from '@pages/auth/page/redirect-kakao';
import RequireLoginPage from '@pages/auth/page/require-login';
import HomePage from '@pages/home/page/home-page';
import MyRequireLoginPage from '@pages/my/page/auth/require-login';
import EditProfile from '@pages/my/page/edit/edit-profile';
import MyPage from '@pages/my/page/my-page';
import MyHistoryPage from '@pages/my-history/page/my-history';
import MyHistoryOverviewPage from '@pages/my-history/page/overview/my-history-overview-page';
import TimetableLayout from '@pages/timetable/page/timetable-layout';
import TimeTablePage from '@pages/timetable/page/timetable-page';

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

export const router = createBrowserRouter([
  {
    path: routePath.ONBOARDING,
    element: <OnboardingPage />,
  },
  {
    path: routePath.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routePath.REDIRECT_KAKAO,
    element: <RedirectKakao />,
  },
  {
    path: routePath.LAYOUT,
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routePath.ROOT,
        element: <HomePage />,
      },

      // MyPage
      {
        path: routePath.MY,
        element: <MyPage />,
        children: [
          {
            path: '',
            element: createProtectedRoute(true, <MyProfilePage />),
          },
          {
            path: routePath.MY_REQUIRE_LOGIN,
            element: <MyRequireLoginPage />,
          },
          {
            path: routePath.MY_ARTIST,
            element: createProtectedRoute(true, <MyArtistPage />),
          },
          {
            path: routePath.MY_CONFETI,
            element: createProtectedRoute(true, <MyConfetiPage />),
          },
          {
            path: routePath.MY_SETTING,
            element: createProtectedRoute(true, <SettingPage />),
          },
          {
            path: routePath.MY_DELETE_ACCOUNT,
            element: createProtectedRoute(true, <DeleteAccountPage />),
          },
          {
            path: routePath.MY_EDIT_PROFILE,
            element: createProtectedRoute(true, <EditProfile />),
          },
        ],
      },

      // MyRecord
      {
        path: routePath.MY_HISTORY,
        element: <MyHistoryPage />,
        children: [
          {
            path: '',
            element: createProtectedRoute(true, <MyRecordPage />),
          },
          {
            path: routePath.MY_HISTORY_REQUIRE_LOGIN,
            element: <RequireLoginPage />,
          },
          {
            path: routePath.MY_HISTORY_OVERVIEW,
            element: <MyHistoryOverviewPage />,
          },
          {
            path: routePath.MY_HISTORY_ADD_SETLIST,
            element: createProtectedRoute(true, <AddSetlistPage />),
          },
          {
            path: routePath.MY_HISTORY_ADD_SONGS,
            element: createProtectedRoute(true, <AddSongsPage />),
          },
          {
            path: routePath.MY_HISTORY_SETLIST_DETAIL,
            element: createProtectedRoute(true, <SetlistDetailPage />),
          },
        ],
      },

      {
        path: routePath.SEARCH,
        element: <SearchPage />,
      },
      {
        path: routePath.CONCERT_DETAIL,
        element: <ConcertDetailPage />,
      },
      {
        path: routePath.FESTIVAL_DETAIL,
        element: <FestivalDetailPage />,
      },

      // TimeTable
      {
        path: routePath.TIME_TABLE_OUTLET,
        element: <TimetableLayout />,
        children: [
          {
            path: '',
            element: createProtectedRoute(true, <TimeTablePage />),
          },
          {
            path: routePath.TIME_TABLE_REQUIRE_LOGIN,
            element: <RequireLoginPage />,
          },
          {
            path: routePath.ADD_FESTIVAL,
            element: createProtectedRoute(true, <AddFestivalPage />),
          },
          {
            path: routePath.DELETE_FESTIVAL,
            element: createProtectedRoute(true, <DeleteFestivalPage />),
          },
        ],
      },

      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
