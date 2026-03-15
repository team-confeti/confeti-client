import { FestivalCard } from '@confeti/design-system';

import { LogClickEvent } from '@shared/analytics/logging';
import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { Performance } from '@shared/types/user-response';

import * as styles from './performance-section.css';

interface PerformanceSectionProps {
  performances: Performance[];
}

const PerformanceSection = ({ performances }: PerformanceSectionProps) => {
  const navigateToDetail = useNavigateToDetail();

  return (
    <div className={styles.container}>
      {performances.map((performance) => (
        <LogClickEvent
          key={performance.index}
          name="click_my_profile_preview_performance"
          params={{
            target_type: performance.type,
            target_id: performance.typeId,
          }}
        >
          <FestivalCard
            title={performance.title}
            imageSrc={performance.posterUrl}
            onClick={() =>
              navigateToDetail(performance.type, performance.typeId)
            }
          />
        </LogClickEvent>
      ))}
    </div>
  );
};

export default PerformanceSection;
