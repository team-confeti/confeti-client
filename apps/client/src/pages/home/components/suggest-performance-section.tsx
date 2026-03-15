import { Box, FestivalCard } from '@confeti/design-system';

import { LogClickEvent } from '@shared/analytics/logging';
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
      title="confeti’s pick!"
      titleSize="lg"
      subtitle="이런 공연은 어떠세요?"
      className={styles.boxWrapper}
    >
      <div className={styles.container}>
        {data.map((performance) => (
          <div
            key={`${performance.typeId}-${performance.title}`}
            className={styles.cardWrapper}
          >
            <LogClickEvent
              name="click_home_suggest_performance"
              params={{
                target_id: performance.typeId,
              }}
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
            </LogClickEvent>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SuggestPerformanceSection;
