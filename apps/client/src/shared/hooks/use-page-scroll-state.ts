import { useLocation } from 'react-router-dom';

import { useScrolled } from './use-scrolled';

export const usePageScrollState = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const isHomePage = pathname === '/';
  const isTimetableLandingPage = pathname === '/timetable';
  const isMyPage = pathname.startsWith('/my');

  const shouldTrackScroll = isHomePage || isTimetableLandingPage;
  const isScrolled = useScrolled(shouldTrackScroll);

  return {
    location,
    pathname,
    isHomePage,
    isTimetableLandingPage,
    isMyPage,
    isScrolled,
  };
};
