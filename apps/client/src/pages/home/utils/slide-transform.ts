import {
  SIDE_SCALE,
  type SlideTransform,
} from '../types/performance-carousel-types';
import { easeInOutCubic } from './carousel-utils';

/**
 * 슬라이드의 중심으로부터의 거리에 따른 scale과 overlay 계산
 */
export function getSlideTransform(distanceFromCenter: number): SlideTransform {
  let scale = 1;
  let overlayOpacity = 0;

  const absDistance = Math.abs(distanceFromCenter);

  if (absDistance <= 2) {
    if (absDistance === 0) {
      // 정확히 가운데인 경우
      scale = 1;
      overlayOpacity = 0;
    } else if (absDistance <= 1) {
      // 가운데에서 1칸 이내: 부드러운 전환
      const progress = absDistance; // 0 -> 1로 증가
      const easedProgress = easeInOutCubic(progress);

      scale = 1 - (1 - SIDE_SCALE) * easedProgress;
      overlayOpacity = easedProgress * 0.8;
    } else {
      // 1칸 초과 2칸 이내: 사이드 카드 상태로 고정
      scale = SIDE_SCALE;
      overlayOpacity = 0.8;
    }
  } else {
    // 범위를 벗어난 경우: 사이드 크기 고정
    scale = SIDE_SCALE;
    overlayOpacity = 0.8;
  }

  return { scale, overlayOpacity };
}
