import { type ReactNode, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: ReactNode;
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useLayoutEffect(
    function scrollToTopOnPathnameChange() {
      window.scrollTo(0, 0);
    },
    [pathname],
  );

  return <>{children}</>;
}
