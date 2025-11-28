import { OFFSET, SIDE_SCALE } from '../constants/dimensions';
import {
  type Performance,
  type SlideData,
  type SlideTransform,
} from '../types/performance-carousel-types';
import { easeInOutCubic } from './carousel-utils';

export function getSlideTransform(distanceFromCenter: number): SlideTransform {
  let scale = 1;
  let overlayOpacity = 0;

  const abs = Math.abs(distanceFromCenter);

  if (abs === 0) {
    scale = 1;
    overlayOpacity = 0;
  } else if (abs <= 1) {
    const eased = easeInOutCubic(abs);
    scale = 1 - (1 - SIDE_SCALE) * eased;
    overlayOpacity = 0.8 * eased;
  } else if (abs <= 2) {
    scale = SIDE_SCALE;
    overlayOpacity = 0.8;
  } else {
    scale = SIDE_SCALE;
    overlayOpacity = 0.8;
  }

  return { scale, overlayOpacity };
}

export function getSlideView(params: {
  position: number;
  dragOffset: number;
  isAnimating: boolean;
  slideIndex: number;
  data: Performance[];
}): SlideData {
  const { position, dragOffset, isAnimating, slideIndex, data } = params;

  const slide = data[slideIndex];
  const distanceFromCenter = position + dragOffset / OFFSET;

  const transform = getSlideTransform(distanceFromCenter);
  const isCenter = position === 0;
  const isRight = position === 1;
  const isLeft = position === -1;
  const isTransitioning = isAnimating || dragOffset !== 0;

  let showInfo = false;
  let infoOpacity = 0;

  if (isCenter) {
    const progress = Math.abs(dragOffset) / OFFSET;
    infoOpacity = dragOffset < 0 ? 1 - progress : 1 - progress;
    showInfo = true;
  } else if (isRight && isTransitioning) {
    const progress = Math.abs(dragOffset) / OFFSET;
    infoOpacity = dragOffset < 0 ? progress : 0;
    showInfo = true;
  } else if (isLeft && isTransitioning) {
    const progress = Math.abs(dragOffset) / OFFSET;
    infoOpacity = dragOffset > 0 ? progress : 0;
    showInfo = true;
  }

  return {
    data: slide,
    index: slideIndex,
    typeId: slide.typeId,
    position,
    distanceFromCenter,
    transform,
    isCenter,
    isRightSlide: isRight,
    translateX: position * OFFSET + dragOffset,
    showInfo,
    infoOpacity,
    sideOverlayOpacity: (1 - infoOpacity) * transform.overlayOpacity,
    zIndex: isCenter ? 10 : 1,
  };
}
