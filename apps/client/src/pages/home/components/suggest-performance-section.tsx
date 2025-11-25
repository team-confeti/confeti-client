import { Box, FestivalCard } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { SuggestPerformance } from '@shared/types/home-response';
import { convertToCdnUrl } from '@shared/utils/convert-to-cdn-url';

import * as styles from './suggest-performance-section.css';

const SuggestPerformanceSection = ({
  data,
}: {
  data: SuggestPerformance[];
}) => {
  const navigateToDetail = useNavigateToDetail();

  return (
    <Box
      title="이런 공연은 어떠세요?"
      titleSize="lg"
      subtitle="confeti's pick!"
      subtitleIcon={<Icon name="heart-filled" size="1.4rem" />}
      className={styles.boxWrapper}
    >
      <div className={styles.container}>
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
