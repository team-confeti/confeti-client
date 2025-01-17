import { useState, useEffect } from 'react';
import * as styles from './festival-card.css';
import { IcSelect } from '../../icons/src';

interface FestivalCardProps {
  festivalId: number;
  title: string;
  imageSrc?: string;
  isSelected?: boolean;
  selectable?: boolean;
  onSelectChange?: (id: number, isSelected: boolean) => void;
}

const FestivalCard = ({
  festivalId,
  title,
  imageSrc = 'https://dummyimage.com/100x142',
  isSelected = false,
  selectable = false,
  onSelectChange,
}: FestivalCardProps) => {
  const [internalSelected, setInternalSelected] = useState(isSelected);

  useEffect(() => {
    setInternalSelected(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    if (!selectable) return;

    const toggledSelected = !internalSelected;
    setInternalSelected(toggledSelected);

    if (onSelectChange) {
      onSelectChange(festivalId, toggledSelected);
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.poster({ selectable })}
        onClick={handleClick}
        aria-pressed={internalSelected}
      >
        <img src={imageSrc} alt={title} className={styles.image} />
        {internalSelected && (
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
