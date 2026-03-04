import { Box } from '@confeti/design-system';

import { Performance } from '@shared/types/search-response';

import PerformanceInfo from './performance-info';

import * as styles from './performance-section.css';

interface Props {
  performanceCount: number;
  performances: Performance[];
}

const PerformanceSection = ({ performanceCount, performances }: Props) => {
  if (performanceCount === 0 || performances.length === 0) {
    return (
      <div className={styles.section}>
        <p className={styles.sectionTitle}>예정된 공연 ({performanceCount})</p>
        <div className={styles.emptyPerformanceSection}>
          아직 예정된 공연이 없어요
        </div>
      </div>
    );
  }

  return (
    <Box title={`예정된 공연 (${performanceCount})`}>
      {performances.map((performance) => (
        <PerformanceInfo
          key={performance.id}
          id={performance.id}
          typeId={performance.typeId}
          type={performance.type}
          title={performance.title}
          startAt={performance.startAt}
          endAt={performance.endAt}
          posterUrl={performance.posterUrl}
          area={performance.area}
          isFavorite={performance.isFavorite}
        />
      ))}
    </Box>
  );
};

export default PerformanceSection;
