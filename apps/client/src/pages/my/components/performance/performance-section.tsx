import { useNavigate } from 'react-router-dom';

import { FestivalCard } from '@confeti/design-system';

import { Performance } from '@shared/types/user-response';

import * as styles from './performance-section.css';

interface ConfetiSectionProps {
  performances: Performance[];
}

const ConfetiSection = ({ performances }: ConfetiSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {performances.map((performance) => (
        <FestivalCard
          key={performance.index}
          title={performance.title}
          imageSrc={performance.posterUrl}
          onClick={() =>
            navigate(`/${performance.type}-detail/${performance.typeId}`)
          }
        />
      ))}
    </div>
  );
};

export default ConfetiSection;
