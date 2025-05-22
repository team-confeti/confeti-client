import { lazy } from 'react';

// Home
export const LoginPage = lazy(() => import('@pages/login/page/login'));

// MyPage
export const MyProfilePage = lazy(
  () => import('@pages/my/page/profile/my-profile'),
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

export const MyRecordPage = lazy(
  () => import('@pages/my-history/page/record/my-record'),
);

export const AddSetlistPage = lazy(
  () => import('@pages/my-history/page/add-setlist/add-setlist-page'),
);
export const SetlistDetailPage = lazy(
  () => import('@pages/my-history/page/setlist-detail/setlist-detail'),
);

export const AddSongsPage = lazy(
  () => import('@pages/my-history/page/add-songs/add-songs-page'),
);

// Search
export const SearchPage = lazy(() => import('@pages/search/page/search-page'));

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

// Onboarding
export const OnboardingPage = lazy(
  () => import('@pages/onboarding/page/onboarding'),
);
