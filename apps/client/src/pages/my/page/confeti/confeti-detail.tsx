import { FestivalCard, Header } from '@confeti/design-system';
import * as styles from './confeti-detail.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/my-confeti';
import { Performance } from '@shared/types/performance-response';

const ConfetiDetail = () => {
  const { data } = useSuspenseQuery(PERFORMANCE_QUERY_OPTIONS.ALL());
  return (
    <>
      <Header variant="detail" title="My Confeti" />
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
    </>
  );
};

export default ConfetiDetail;
