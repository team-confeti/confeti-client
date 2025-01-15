import { lazy } from 'react';

export const HomePage = lazy(() => import('@pages/home/page/home'));
export const MyPage = lazy(() => import('@pages/my/page/my'));
export const MyConfetiPage = lazy(
  () => import('@pages/my/page/confeti-detail'),
);
export const MyArtistPage = lazy(() => import('@pages/my/page/artist-detail'));
