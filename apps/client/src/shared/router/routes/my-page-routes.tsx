import MyRequireLoginPage from '@pages/my/page/auth/require-login';
import EditProfile from '@pages/my/page/edit/edit-profile';
import MyPage from '@pages/my/page/my-page';

import {
  DeleteAccountPage,
  MyArtistPage,
  MyConfetiPage,
  MyProfilePage,
  SettingPage,
} from '../lazy';
import { routePath } from '../path';
import { createProtectedRoute } from '../protected-route';

export const myPageRoutes = [
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
];
