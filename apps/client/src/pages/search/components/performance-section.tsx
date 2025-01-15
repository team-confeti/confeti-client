import PerformanceInfo from '../components/performance-info';
import Title from '../components/title';
import * as styles from './performance-section.css';

interface PerformanceSectionProps {
  performances: {
    performanceId: number;
    title: string;
    performanceAt: string;
    posterUrl: string;
    area: string;
    isFavorite: boolean;
  }[];
}

const PerformanceSection = ({ performances }: PerformanceSectionProps) => {
  return (
    <div className={styles.section}>
      <Title text="예정된 공연" />
      {performances.length > 0 ? (
        performances.map((performance) => (
          <PerformanceInfo
            key={performance.performanceId}
            title={performance.title}
            performanceAt={performance.performanceAt}
            posterUrl={performance.posterUrl}
            area={performance.area}
            isFavorite={performance.isFavorite}
          />
        ))
      ) : (
        <div className={styles.emptyPerformanceSection}>
          아직 예정된 공연이 없어요!
        </div>
      )}
    </div>
  );
};

export default PerformanceSection;
