import { useCallback, useEffect, useRef, useState } from 'react';

import { CAROUSEL_ANIMATION } from '../constants/animation';

export function useCarouselBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTimerRef = useRef<number | null>(null);

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      if (newIndex !== activeIndex) {
        if (transitionTimerRef.current) {
          window.clearTimeout(transitionTimerRef.current);
        }

        setNextIndex(newIndex);
        setIsTransitioning(true);

        transitionTimerRef.current = window.setTimeout(() => {
          setActiveIndex(newIndex);
          setIsTransitioning(false);
          transitionTimerRef.current = null;
        }, CAROUSEL_ANIMATION.DURATION);
      }
    },
    [activeIndex],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return {
    activeIndex,
    nextIndex,
    isTransitioning,
    handleSlideChange,
  };
}
