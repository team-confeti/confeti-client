import { lazy } from 'react';

// Shared
export const ErrorPage = lazy(() => import('@shared/pages/error/error'));
export const GlobalLayout = lazy(() => import('@shared/router/global-layout'));

// Home
export const HomePage = lazy(() => import('@pages/home/page/home'));
export const LoginPage = lazy(() => import('@pages/login/page/login'));
export const RequireLoginPage = lazy(
  () => import('@pages/home/page/auth/require-login'),
);

// MyPage
export const MyPage = lazy(() => import('@pages/my/page/my-page'));
export const MyProfilePage = lazy(
  () => import('@pages/my/page/profile/my-profile'),
);
export const MyRequireLoginPage = lazy(
  () => import('@pages/my/page/auth/require-login'),
);
export const MyConfetiPage = lazy(
  () => import('@pages/my/page/performance/performance-more'),
);
export const MyArtistPage = lazy(
  () => import('@pages/my/page/artist/artist-more'),
);
export const SettingPage = lazy(() => import('@pages/my/page/setting/setting'));
export const DeleteAccountPage = lazy(
  () => import('@pages/my/page/setting/delete-account'),
);

// MyHistory
export const MyHistoryPage = lazy(
  () => import('@pages/my-history/page/my-history'),
);
export const MyRecordPage = lazy(
  () => import('@pages/my-history/page/record/my-record'),
);

// Search
export const SearchPage = lazy(() => import('@pages/search/page/search'));

// Detail
export const ConcertDetailPage = lazy(
  () => import('@pages/performance/page/concert-detail'),
);
export const FestivalDetailPage = lazy(
  () => import('@pages/performance/page/festival-detail'),
);

// TimeTable
export const DeleteFestivalPage = lazy(
  () => import('@pages/time-table/page/delete-festival/delete-festival-page'),
);

export const AddFestivalPage = lazy(
  () => import('@pages/time-table/page/add-festival/add-festival'),
);
export const TimeTablePage = lazy(
  () => import('@pages/time-table/page/time-table-page'),
);
export const TimeTableLayout = lazy(
  () => import('@pages/time-table/page/time-table-layout'),
);

// Onboarding
export const OnboardingPage = lazy(
  () => import('@pages/onboarding/page/onboarding'),
);
