import { useCarouselBackground } from '../hooks/use-carousel-background';
import PerformanceCarousel from './performance-carousel/components/performance-carousel';
import { CAROUSEL_ANIMATION } from './performance-carousel/constants/animation';
import { type Performance } from './performance-carousel/types/performance-carousel-types';

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
  const { activeIndex, nextIndex, isTransitioning, handleSlideChange } =
    useCarouselBackground();

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.backgroundWrapper}>
        {/* 현재 배경 */}
        <img
          src={data[activeIndex]?.posterUrl}
          alt={data[activeIndex]?.title}
          className={styles.backgroundImage}
          style={{
            transition: `opacity ${CAROUSEL_ANIMATION.DURATION}ms ${CAROUSEL_ANIMATION.EASING}`,
          }}
        />

        {/* 다음 배경 (fade-in) */}
        <img
          src={data[nextIndex]?.posterUrl}
          alt={data[nextIndex]?.title}
          className={styles.backgroundImageFront}
          style={{
            opacity: isTransitioning ? 1 : 0,
            transition: `opacity ${CAROUSEL_ANIMATION.DURATION}ms ${CAROUSEL_ANIMATION.EASING}`,
          }}
        />

        <div className={styles.backgroundOverlay} />
      </div>

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
