import { FestivalCard, Header } from '@confeti/design-system';
import { useSuspenseQuery } from '@tanstack/react-query';
import { USER_QUERY_OPTIONS } from '@shared/apis/user-queries';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import * as styles from './confeti-more.css';

const ConfetiMore = () => {
  const { data } = useSuspenseQuery(USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES());

  const allPerformances = [
    ...data.performances,
    ...PERFORMANCE_DATA.data.performances,
  ];

  return (
    <>
      <Header variant="detail" title="My Confeti" />
      <div className={styles.container}>
        {allPerformances.map((performance) => (
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

export default ConfetiMore;
