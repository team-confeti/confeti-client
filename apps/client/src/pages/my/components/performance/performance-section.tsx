import { FestivalCard } from '@confeti/design-system';
import { Performance } from '@shared/types/user-response';

import * as styles from './performance-section.css';

interface ConfetiSectionProps {
  performances: Performance[];
}

const ConfetiSection = ({ performances }: ConfetiSectionProps) => {
  return (
    <div className={styles.container}>
      {performances.map((performance) => (
        <FestivalCard
          key={performance.index}
          typeId={performance.typeId}
          type={performance.type}
          title={performance.title}
          imageSrc={performance.posterUrl}
        />
      ))}
    </div>
  );
};

export default ConfetiSection;
