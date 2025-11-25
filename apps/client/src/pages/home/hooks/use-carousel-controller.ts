import { useEffect, useRef, useState } from 'react';

import {
  ANIM_MS,
  DRAG_THRESHOLD,
  OFFSET,
  type Performance,
} from '../types/performance-carousel-types';
import { mod } from '../utils/carousel-utils';
import { getSlideTransform } from '../utils/slide-transform';

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

  const startXRef = useRef<number | null>(null);
  const animTimerRef = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // 초기 로딩 시 첫 번째 이미지 표시
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
    }, ANIM_MS);
  };

  const goNext = () => finishAnimation('next');
  const goPrev = () => finishAnimation('prev');

  const startAutoplay = () => {
    clearAutoplay();
    if (length <= 1) return;
    autoplayRef.current = window.setInterval(() => {
      goNext();
    }, autoPlayInterval);
  };

  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
  }, [index, length, autoPlayInterval]);

  // Pointer events for drag
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'touch') {
        clearAutoplay();
        setIsAnimating(false);
        startXRef.current = e.clientX;
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (startXRef.current !== null) {
        const delta = e.clientX - startXRef.current;
        const capped = Math.max(-OFFSET, Math.min(OFFSET, delta));
        setDragOffset(capped);
      }
    };

    const endDrag = () => {
      if (startXRef.current === null) return;
      const delta = dragOffset;
      startXRef.current = null;

      if (Math.abs(delta) > DRAG_THRESHOLD) {
        if (delta < 0) goNext();
        else goPrev();
      } else {
        setIsAnimating(true);
        setDragOffset(0);
        window.setTimeout(() => {
          setIsAnimating(false);
          startAutoplay();
        }, ANIM_MS);
      }
    };

    const onPointerUp = () => endDrag();
    const onPointerCancel = () => endDrag();
    const onPointerLeave = () => endDrag();

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerCancel);
    el.addEventListener('pointerleave', onPointerLeave);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerCancel);
      el.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [dragOffset, length]);

  // Calculate visible slides
  const visibleSlides = [];

  // 공연이 1개일 때는 가운데 슬라이드만 표시
  if (length === 1) {
    const transform = getSlideTransform(0);
    visibleSlides.push({
      data: data[0],
      index: 0,
      position: 0,
      distanceFromCenter: 0,
      transform,
    });
  } else {
    // 공연이 2개 이상일 때는 좌우 슬라이드 포함
    for (let i = -2; i <= 2; i++) {
      const slideIndex = mod(index + i, length);
      const slideData = data[slideIndex];
      const distanceFromCenter = i + dragOffset / OFFSET;
      const transform = getSlideTransform(distanceFromCenter);

      visibleSlides.push({
        data: slideData,
        index: slideIndex,
        position: i,
        distanceFromCenter,
        transform,
      });
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
