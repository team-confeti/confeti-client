import PerformanceInfo from '../components/performance-info';
import Title from '../components/title';
import * as styles from './performance-section.css';

interface PerformanceSectionProps {
  performances?: {
    performanceId: number;
    typeId: number;
    type: string;
    title: string;
    performanceStartAt: string;
    performanceEndAt: string;
    posterUrl: string;
    area: string;
    isFavorite: boolean;
  }[];
}

const PerformanceSection = ({ performances }: PerformanceSectionProps) => {
  if (performances?.length === 0) {
    return (
      <div className={styles.emptyPerformanceSection}>
        아직 예정된 공연이 없어요!
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <Title text="예정된 공연" />
      {performances?.map((performance) => {
        return (
          <PerformanceInfo
            key={performance.performanceId}
            performanceId={performance.typeId}
            type={performance.type}
            title={performance.title}
            performanceAt={`${performance.performanceStartAt} - ${performance.performanceEndAt}`}
            posterUrl={performance.posterUrl}
            area={performance.area}
            isFavorite={performance.isFavorite}
          />
        );
      })}
    </div>
  );
};

export default PerformanceSection;
