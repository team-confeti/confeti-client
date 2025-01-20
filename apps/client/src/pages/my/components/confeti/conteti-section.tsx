import { FestivalCard } from '@confeti/design-system';
import * as styles from './confeti-section.css';

type Confeti = {
  performanceId: number;
  title: string;
  type: 'concert' | 'festival';
  posterUrl: string;
};

interface ConfetiProps {
  confeti: Confeti[];
}

const ConfetiSection = ({ confeti }: ConfetiProps) => {
  return (
    <div className={styles.container}>
      {confeti.map((confeti) => (
        <FestivalCard
          key={confeti.performanceId}
          id={confeti.performanceId}
          type={confeti.type}
          title={confeti.title}
          imageSrc={confeti.posterUrl}
        />
      ))}
    </div>
  );
};

export default ConfetiSection;
