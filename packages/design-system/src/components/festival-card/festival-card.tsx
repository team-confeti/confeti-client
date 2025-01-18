import * as styles from './festival-card.css';
import { IcSelect } from '../../icons/src';

interface FestivalCardProps {
  festivalId?: number;
  title: string;
  imageSrc?: string;
  isSelected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
}

const FestivalCard = ({
  title,
  imageSrc = 'https://dummyimage.com/100x142',
  isSelected = false,
  selectable = false,
  onClick,
}: FestivalCardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.poster({ selectable })}
        onClick={selectable ? onClick : undefined}
        aria-pressed={isSelected}
      >
        <img src={imageSrc} alt={title} className={styles.image} />
        {isSelected && (
          <div className={styles.overlay}>
            <IcSelect className={styles.icon} />
          </div>
        )}
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default FestivalCard;
