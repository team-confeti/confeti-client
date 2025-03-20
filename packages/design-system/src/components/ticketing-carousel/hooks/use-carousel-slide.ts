/**
 * 슬라이드 전환 및 상태 관리 함수
 */
import { useCallback, useState } from 'react';

export const useCarouselSlide = (imagesLength: number) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 0.5s ease-in-out',
  );

  const resetTransition = useCallback(() => {
    setCarouselTransition('none');
    setCurrentIndex(1);
  }, []);

  const nextSlide = useCallback(() => {
    if (currentIndex === imagesLength - 1) {
      resetTransition();
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesLength);
      setCarouselTransition('transform 0.5s ease-in-out');
    }
  }, [currentIndex, imagesLength, resetTransition]);

  return { currentIndex, carouselTransition, nextSlide, resetTransition };
};
