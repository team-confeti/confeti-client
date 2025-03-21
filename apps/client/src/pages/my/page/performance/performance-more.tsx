import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';

import { FestivalCard, Header } from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';

import * as styles from './performance-more.css';

const ConfetiMore = () => {
  const { data } = useMyConfeti();

  if (!data) return null;

  const allPerformances = [
    ...data.performances,
    ...PERFORMANCE_DATA.performances,
  ];

  return (
    <>
      <Header variant="detail" title="My Confeti" />
      <div className={styles.container}>
        {allPerformances.map((performance) => (
          <FestivalCard
            key={performance.index}
            typeId={performance.typeId}
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
