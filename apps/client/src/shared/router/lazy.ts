import { lazy } from 'react';

export const ErrorPage = lazy(() => import('@shared/pages/error/error'));
export const GlobalLayout = lazy(() => import('@shared/router/global-layout'));
export const HomePage = lazy(() => import('@pages/home/page/home'));
export const MyPage = lazy(() => import('@pages/my/page/my-page'));
export const MyProfilePage = lazy(
  () => import('@pages/my/page/profile/my-profile'),
);
export const RequireLoginPage = lazy(
  () => import('@pages/my/page/auth/require-login'),
);
export const SearchPage = lazy(() => import('@pages/search/page/search'));
export const MyConfetiPage = lazy(
  () => import('@pages/my/page/performance/performance-more'),
);
export const MyArtistPage = lazy(
  () => import('@pages/my/page/artist/artist-more'),
);
export const ConcertDetailPage = lazy(
  () => import('@pages/performance/page/concert-detail'),
);
export const FestivalDetailPage = lazy(
  () => import('@pages/performance/page/festival-detail'),
);
export const AddFestivalPage = lazy(
  () => import('@pages/time-table/page/add-festival'),
);
export const TimeTablePage = lazy(
  () => import('@pages/time-table/page/time-table'),
);
export const TimeTableLayout = lazy(
  () => import('@pages/time-table/page/time-table-layout'),
);
export const EmptyFestivalPage = lazy(
  () => import('@pages/time-table/page/empty/empty-festival-page'),
);
export const TimeTableRequireLoginPage = lazy(
  () => import('@pages/home/page/auth/require-login'),
);
export const LoginPage = lazy(() => import('@pages/login/page/login'));
export const SettingPage = lazy(() => import('@pages/my/page/setting'));
export const DeleteAccountPage = lazy(
  () => import('@pages/my/page/delete-account'),
);
