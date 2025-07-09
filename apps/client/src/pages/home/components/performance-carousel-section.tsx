import { PerformanceCarousel } from '@confeti/design-system';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { CarouselPerformancesResponse } from '@shared/types/home-response';
import { convertToCdnUrl } from '@shared/utils/convert-to-cdn-url';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './performance-carousel-section.css';

const PerformanceCarouselSection = ({
  data,
}: {
  data: CarouselPerformancesResponse;
}) => {
  const navigateToDetail = useNavigateToDetail();

  const badgeText = data.isPersonalized ? '선호하는 아티스트' : '다가오는 공연';
  const displayPerformances = data.performances.slice(0, 7);
  const formattedPerformData = displayPerformances.map((performance) => {
    return {
      ...performance,
      performanceAt: formatDate(performance.startAt),
      posterUrl: convertToCdnUrl(performance.posterUrl),
    };
  });
  const initialSlideIndex = Math.floor(formattedPerformData.length / 2);

  return (
    <section className={styles.performanceBannerContainer}>
      <PerformanceCarousel
        performData={formattedPerformData}
        initialSlideIndex={initialSlideIndex}
        handleContainerClick={(type, typeId) => navigateToDetail(type, typeId)}
      >
        <PerformanceCarousel.ImageSlider>
          <PerformanceCarousel.Badge text={badgeText} />
          <PerformanceCarousel.Info />
        </PerformanceCarousel.ImageSlider>
      </PerformanceCarousel>
    </section>
  );
};

export default PerformanceCarouselSection;
