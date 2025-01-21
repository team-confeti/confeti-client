import { FestivalCard } from '@confeti/design-system';
import * as styles from './confeti-section.css';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/my-confeti';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Performance } from '@shared/types/performance-response';

// type Confeti = {
//   performanceId: number;
//   title: string;
//   type: 'concert' | 'festival';
//   posterUrl: string;
// };

// interface ConfetiProps {
//   confeti: Performance[];
// }

const ConfetiSection = () => {
  const { data } = useSuspenseQuery(PERFORMANCE_QUERY_OPTIONS.ALL());

  return (
    <div className={styles.container}>
      {data.performances.map((performance: Performance) => (
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
