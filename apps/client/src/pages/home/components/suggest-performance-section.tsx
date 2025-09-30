import { Box, FestivalCard } from '@confeti/design-system';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { SuggestPerformance } from '@shared/types/home-response';
import { convertToCdnUrl } from '@shared/utils/convert-to-cdn-url';

import * as styles from './suggest-performance-section.css';

const SuggestPerformanceSection = ({
  data,
  ref,
}: {
  data: SuggestPerformance[];
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const navigateToDetail = useNavigateToDetail();

  return (
    <Box
      title="confeti’s pick!"
      titleSize="lg"
      subtitle="이런 공연은 어떠세요?"
      className={styles.boxWrapper}
    >
      <div className={styles.container} ref={ref}>
        {data.map((performance) => (
          <div
            key={`${performance.typeId}-${performance.title}`}
            className={styles.cardWrapper}
          >
            <FestivalCard
              title={performance.title}
              imageSrc={convertToCdnUrl(performance.posterUrl, {
                width: 232,
                height: 330,
              })}
              onClick={() =>
                navigateToDetail(performance.type, performance.typeId)
              }
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SuggestPerformanceSection;
