import { useCallback, useRef } from 'react';

type ScrollSource = 'primary' | 'secondary' | null;

const useSyncScroll = () => {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const scrollSource = useRef<ScrollSource>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearScrollLock = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      scrollSource.current = null;
    }, 1);
  }, []);

  const handlePrimaryScroll = useCallback(() => {
    if (scrollSource.current === 'secondary') return;
    scrollSource.current = 'primary';

    if (primaryRef.current && secondaryRef.current) {
      secondaryRef.current.scrollLeft = primaryRef.current.scrollLeft;
    }
    clearScrollLock();
  }, [clearScrollLock]);

  const handleSecondaryScroll = useCallback(() => {
    if (scrollSource.current === 'primary') return;
    scrollSource.current = 'secondary';

    if (primaryRef.current && secondaryRef.current) {
      primaryRef.current.scrollLeft = secondaryRef.current.scrollLeft;
    }
    clearScrollLock();
  }, [clearScrollLock]);

  return {
    primaryRef,
    secondaryRef,
    handlePrimaryScroll,
    handleSecondaryScroll,
  };
};

export default useSyncScroll;
