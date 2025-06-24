import { PerformanceCarousel } from '@confeti/design-system';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { CarouselPerformances } from '@shared/types/home-response';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';
import { convertToCdnUrl } from '@shared/utils/convert-to-cdn-url';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './performance-carousel-section.css';

const PerformanceCarouselSection = ({
  data,
}: {
  data: CarouselPerformances[];
}) => {
  const navigateToDetail = useNavigateToDetail();
  const badgeText = checkIsNotLoggedIn()
    ? '다가오는 공연'
    : '선호하는 아티스트';

  const displayPerformances = data.length > 7 ? data.slice(0, 7) : data;
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
