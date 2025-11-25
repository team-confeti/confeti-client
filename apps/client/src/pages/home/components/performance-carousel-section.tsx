import PerformanceCarousel from './performance-carousel/components/performance-carousel';
import { useCarouselBackground } from './performance-carousel/hooks/use-carousel-background';
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
        <img
          src={data[activeIndex]?.posterUrl}
          alt={data[activeIndex]?.title}
          className={styles.backgroundImage}
        />
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
