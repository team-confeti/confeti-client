import { useCallback, useEffect, useRef, useState } from 'react';

import { type Performance } from '../types/performance-carousel-types';
import PerformanceCarousel from './performance-carousel';

import * as styles from './performance-carousel-section.css';

interface PerformanceCarouselSectionProps {
  data: Performance[];
  isPersonalized: boolean;
  onPerformanceClick?: (type: 'FESTIVAL' | 'CONCERT', typeId: number) => void;
}

const PerformanceCarouselSection = ({
  data,
  isPersonalized,
  onPerformanceClick,
}: PerformanceCarouselSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  // 슬라이드 변경 시 부드러운 전환 처리
  const handleSlideChange = useCallback(
    (newIndex: number) => {
      if (newIndex !== activeIndex) {
        // 이전 타이머가 있다면 정리
        if (transitionTimerRef.current) {
          window.clearTimeout(transitionTimerRef.current);
        }

        // 새 이미지를 미리 준비하고 즉시 전환 시작
        setNextIndex(newIndex);
        setIsTransitioning(true);

        // 전환 완료 후 인덱스 업데이트
        transitionTimerRef.current = window.setTimeout(() => {
          setActiveIndex(newIndex);
          setIsTransitioning(false);
          transitionTimerRef.current = null;
        }, 850); // 캐러셀 애니메이션 시간과 맞춤
      }
    },
    [activeIndex],
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <section className={styles.sectionContainer}>
      {/* 배경 */}
      <div className={styles.backgroundWrapper}>
        {/* 현재 배경 이미지 (뒤쪽) */}
        <img
          src={data[activeIndex]?.posterUrl}
          alt={data[activeIndex]?.title}
          className={styles.backgroundImage}
        />

        {/* 다음 배경 이미지 (앞쪽) */}
        <img
          src={data[nextIndex]?.posterUrl}
          alt={data[nextIndex]?.title}
          className={styles.backgroundImageFront}
          style={{
            opacity: isTransitioning ? 1 : 0,
          }}
        />

        <div className={styles.backgroundOverlay} />
      </div>

      {/* 캐러셀 */}
      <div className={styles.carouselWrapper}>
        <PerformanceCarousel
          data={data}
          isPersonalized={isPersonalized}
          autoPlayInterval={5000}
          onSlideChange={handleSlideChange}
          onPerformanceClick={onPerformanceClick}
        />
      </div>
    </section>
  );
};

export default PerformanceCarouselSection;
