import { useEffect } from 'react';

export const usePreventScroll = (isDragging: boolean) => {
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault();

    if (isDragging) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, {
        passive: false,
      });
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isDragging]);
};
