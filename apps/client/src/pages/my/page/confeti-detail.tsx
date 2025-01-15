import { FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import * as styles from './confeti-detail.css';

const ConfetiDetail = () => {
  return (
    <>
      <Header variant="detail" title="My Confeti" />
      <div className={styles.container}>
        {PERFORMANCE_DATA.data.performances.map((performance) => (
          <FestivalCard
            key={performance.performanceId}
            title={performance.title}
            imageSrc={performance.posterUrl}
          />
        ))}
      </div>
    </>
  );
};

export default ConfetiDetail;
