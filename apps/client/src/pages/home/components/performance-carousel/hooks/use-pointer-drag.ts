import { RefObject, useEffect, useRef } from 'react';

import { CAROUSEL_ANIMATION } from '../constants/animation';
import { OFFSET } from '../constants/dimensions';
import { DRAG_THRESHOLD } from '../constants/interaction';

interface UsePointerDragParams {
  rootRef: RefObject<HTMLDivElement | null>;
  dragOffset: number;
  setDragOffset: (v: number) => void;
  setIsAnimating: (v: boolean) => void;
  clearAutoplay: () => void;
  startAutoplay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function usePointerDrag({
  rootRef,
  dragOffset,
  setDragOffset,
  setIsAnimating,
  clearAutoplay,
  startAutoplay,
  onNext,
  onPrev,
}: UsePointerDragParams) {
  const startXRef = useRef<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      clearAutoplay();
      setIsAnimating(false);
      startXRef.current = e.clientX;
      (e.target as Element).setPointerCapture?.(e.pointerId);
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
        if (delta < 0) onNext();
        else onPrev();
      } else {
        setIsAnimating(true);
        setDragOffset(0);
        window.setTimeout(() => {
          setIsAnimating(false);
          startAutoplay();
        }, CAROUSEL_ANIMATION.DURATION);
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
  }, [dragOffset, rootRef, onNext, onPrev]);

  return undefined; // ESLint no-unused-expressions 방지
}
