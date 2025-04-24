import { PerformanceCarousel } from '@confeti/design-system';
import { CarouselPerformances } from '@shared/types/home-response';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './performance-carousel-section.css';

const PerformanceCarouselSection = ({
  data,
}: {
  data: CarouselPerformances[];
}) => {
  const displayPerformances = data.length > 7 ? data.slice(0, 7) : data;

  const formattedPerformData = displayPerformances.map((performance) => ({
    ...performance,
    performanceAt: formatDate(performance.startAt),
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
