import { lazy } from 'react';

export const HomePage = lazy(() => import('@pages/home/page/home'));
export const MyPage = lazy(() => import('@pages/my/page/my-page'));
export const MyProfilePage = lazy(
  () => import('@pages/my/page/profile/my-profile'),
);
export const RequireLoginPage = lazy(
  () => import('@pages/my/page/auth/require_login'),
);
export const SearchPage = lazy(() => import('@pages/search/page/search'));
export const MyConfetiPage = lazy(
  () => import('@pages/my/page/confeti/confeti-detail'),
);
export const MyArtistPage = lazy(
  () => import('@pages/my/page/artist/artist-detail'),
);
export const ConcertDetailPage = lazy(
  () => import('@pages/confeti/page/concert-detail'),
);
export const FestivalDetailPage = lazy(
  () => import('@pages/confeti/page/festival-detail'),
);
export const AddFestivalPage = lazy(
  () => import('@pages/time-table/page/add-festival'),
);
export const TimeTable = lazy(
  () => import('@pages/time-table/page/time-table'),
);
export const TimeTableLayout = lazy(
  () => import('@pages/time-table/page/time-table-layout'),
);
export const EmptyFestivalPage = lazy(
  () => import('@pages/time-table/page/empty/empty-festival'),
);
