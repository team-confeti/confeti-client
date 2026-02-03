import { useEffect, useState } from 'react';

export const useScrolled = (shouldTrack: boolean = false): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!shouldTrack) {
      setIsScrolled(false);
      return;
    }

    const checkScrollPosition = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    checkScrollPosition();

    window.addEventListener('scroll', checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [shouldTrack]);

  return isScrolled;
};
