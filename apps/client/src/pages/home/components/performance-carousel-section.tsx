import { PerformanceCarousel } from '@confeti/design-system';
import { formatDate } from '@shared/utils/format-date';

import { useLatestPerformances } from '../hooks/use-latest-performances';

import * as styles from './performance-carousel-section.css';

const PerformanceCarouselSection = () => {
  const { latestPerformances } = useLatestPerformances();
  const displayPerformances =
    latestPerformances.length > 7
      ? latestPerformances.slice(0, 7)
      : latestPerformances;

  const formattedPerformData = displayPerformances.map((performance) => ({
    ...performance,
    performanceAt: formatDate(performance.performanceAt),
  }));

  const initialSlideIndex = Math.floor(formattedPerformData.length / 2);

  return (
    <section className={styles.performanceBannerContainer}>
      <PerformanceCarousel
        performData={formattedPerformData}
        initialSlideIndex={initialSlideIndex}
      >
        <PerformanceCarousel.ImageSlider>
          <PerformanceCarousel.Badge text="선호하는 아티스트" />
          <PerformanceCarousel.Info />
        </PerformanceCarousel.ImageSlider>
      </PerformanceCarousel>
    </section>
  );
};

export default PerformanceCarouselSection;
