import { lazy } from 'react';

export const HomePage = lazy(() => import('@pages/home/page/home'));
export const MyPage = lazy(() => import('@pages/my/page/my'));
export const MyConfetiPage = lazy(
  () => import('@pages/my/page/confeti-detail'),
);
export const ConcertDetailPage = lazy(
  () => import('@pages/confeti/page/concert-detail'),
);
export const FestivalDetailPage = lazy(
  () => import('@pages/confeti/page/festival-detail'),
);
