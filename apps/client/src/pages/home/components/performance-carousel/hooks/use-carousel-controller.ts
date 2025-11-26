import { useEffect, useRef, useState } from 'react';

import { CAROUSEL_ANIMATION } from '../constants/animation';
import { OFFSET } from '../constants/dimensions';
import {
  type Performance,
  type SlideData,
} from '../types/performance-carousel-types';
import { mod } from '../utils/carousel-utils';
import { getSlideView } from '../utils/slide-transform';
import { usePointerDrag } from './use-pointer-drag';
interface UseCarouselControllerProps {
  data: Performance[];
  autoPlayInterval: number;
  onSlideChange?: (index: number) => void;
}

export function useCarouselController({
  data,
  autoPlayInterval,
  onSlideChange,
}: UseCarouselControllerProps) {
  const length = data?.length ?? 0;

  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animTimerRef = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onSlideChange?.(0);
  }, []);

  const clearAutoplay = () => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const finishAnimation = (to: 'next' | 'prev') => {
    if (animTimerRef.current) {
      window.clearTimeout(animTimerRef.current);
      animTimerRef.current = null;
    }
    if (length <= 0) return;

    const nextIndex =
      to === 'next' ? mod(index + 1, length) : mod(index - 1, length);
    onSlideChange?.(nextIndex);

    setIsAnimating(true);
    setDragOffset(to === 'next' ? -OFFSET : OFFSET);

    animTimerRef.current = window.setTimeout(() => {
      setIndex(nextIndex);
      setIsAnimating(false);
      setDragOffset(0);
      animTimerRef.current = null;
    }, CAROUSEL_ANIMATION.DURATION);
  };

  const goNext = () => finishAnimation('next');
  const goPrev = () => finishAnimation('prev');

  const startAutoplay = () => {
    clearAutoplay();
    if (length > 1) {
      autoplayRef.current = window.setInterval(goNext, autoPlayInterval);
    }
  };

  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
  }, [index, length, autoPlayInterval]);

  usePointerDrag({
    rootRef,
    dragOffset,
    isAnimating,
    setDragOffset,
    setIsAnimating,
    clearAutoplay,
    startAutoplay,
    onNext: goNext,
    onPrev: goPrev,
  });

  const visibleSlides: SlideData[] = [];

  if (length === 1) {
    visibleSlides.push(
      getSlideView({
        position: 0,
        dragOffset,
        isAnimating,
        slideIndex: 0,
        data,
      }),
    );
  } else {
    for (let i = -2; i <= 2; i++) {
      visibleSlides.push(
        getSlideView({
          position: i,
          dragOffset,
          isAnimating,
          slideIndex: mod(index + i, length),
          data,
        }),
      );
    }
  }

  return {
    index,
    dragOffset,
    isAnimating,
    rootRef,
    visibleSlides,
    length,
  };
}
