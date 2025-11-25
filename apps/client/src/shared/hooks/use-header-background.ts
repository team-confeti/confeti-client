import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useHeaderBackground = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [isWhiteBackground, setIsWhiteBackground] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    let scrollHandler: (() => void) | null = null;

    const setupScrollHandler = () => {
      const ticketSection = document.querySelector(
        '[data-ticket-section="true"]',
      );

      if (!ticketSection) {
        requestAnimationFrame(setupScrollHandler);
        return;
      }

      const headerElement = document.querySelector('header');
      const headerHeight = headerElement
        ? Math.ceil(headerElement.getBoundingClientRect().height)
        : 54;

      const checkIfPassed = () => {
        const rect = ticketSection.getBoundingClientRect();
        return rect.bottom <= headerHeight;
      };

      setIsWhiteBackground(checkIfPassed());

      scrollHandler = () => {
        setIsWhiteBackground(checkIfPassed());
      };

      window.addEventListener('scroll', scrollHandler, { passive: true });
    };

    setupScrollHandler();

    return () => {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [isHomePage]);

  return isWhiteBackground;
};
