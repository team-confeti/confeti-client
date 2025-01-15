import { lazy } from 'react';

export const HomePage = lazy(() => import('@pages/home/page/home'));
export const MyPage = lazy(() => import('@pages/my/page/my'));
export const SearchPage = lazy(() => import('@pages/search/page/search'));
