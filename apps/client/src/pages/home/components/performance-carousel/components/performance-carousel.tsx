import { useCarouselController } from '../hooks/use-carousel-controller';
import { PerformanceCarouselProps } from '../types/performance-carousel-types';
import { SlideView } from './slide-view';

import * as styles from './performance-carousel.css';

const PerformanceCarousel = ({
  data,
  isPersonalized,
  autoPlayInterval = 5000,
  onSlideChange,
  onPerformanceClick,
}: PerformanceCarouselProps) => {
  const length = data?.length ?? 0;

  if (!Array.isArray(data) || length === 0) {
    return null;
  }

  const { isAnimating, rootRef, visibleSlides } = useCarouselController({
    data,
    autoPlayInterval,
    onSlideChange,
  });

  return (
    <div ref={rootRef} className={styles.root} aria-roledescription="carousel">
      <div className={styles.carouselTrack}>
        {visibleSlides.map((slide) => (
          <SlideView
            key={slide.index}
            slide={slide}
            length={length}
            isAnimating={isAnimating}
            isPersonalized={isPersonalized}
            onPerformanceClick={onPerformanceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PerformanceCarousel;
