/**
 * 슬라이드 간격 시간 설정 함수
 */
import { useMemo } from 'react';

export const useControlTime = (carouselTransition: string) => {
  return useMemo(
    () => (carouselTransition === 'none' ? 10 : 5000),
    [carouselTransition],
  );
};
