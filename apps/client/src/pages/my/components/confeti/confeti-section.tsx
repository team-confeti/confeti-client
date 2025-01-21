import { FestivalCard } from '@confeti/design-system';
import * as styles from './confeti-section.css';
import { Performance } from '@shared/types/performance-response';

interface ConfetiSectionProps {
  performances: Performance[];
}

const ConfetiSection = ({ performances }: ConfetiSectionProps) => {
  return (
    <div className={styles.container}>
      {performances.map((performance: Performance) => (
        <FestivalCard
          key={performance.performanceId}
          id={performance.performanceId}
          type={performance.type}
          title={performance.title}
          imageSrc={performance.posterUrl}
        />
      ))}
    </div>
  );
};

export default ConfetiSection;
