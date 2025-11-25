import { FestivalCard } from '@confeti/design-system';

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
        <FestivalCard
          key={performance.index}
          title={performance.title}
          imageSrc={performance.posterUrl}
          onClick={() => navigateToDetail(performance.type, performance.typeId)}
        />
      ))}
    </div>
  );
};

export default PerformanceSection;
