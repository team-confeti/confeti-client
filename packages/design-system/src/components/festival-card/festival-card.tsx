import { useState } from 'react';

import { Icon } from '../../icons';

import * as styles from './festival-card.css';

interface FestivalCardProps {
  title: string;
  imageSrc?: string;
  isSelected?: boolean;
  selectable?: boolean;
  onSelectChange?: (title: string, isSelected: boolean) => void;
  onClick?: () => void;
}

const FestivalCard = ({
  title,
  imageSrc = 'https://dummyimage.com/100x142',
  isSelected = false,
  selectable = false,
  onSelectChange,
  onClick,
}: FestivalCardProps) => {
  const [internalSelected, setInternalSelected] = useState(isSelected);

  const handleClick = () => {
    if (selectable) {
      const toggledSelected = !internalSelected;
      setInternalSelected(toggledSelected);
      onSelectChange?.(title, toggledSelected);
    }

    onClick?.();
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.poster({ selectable })}
        aria-pressed={internalSelected}
        onClick={() => handleClick()}
      >
        <img src={imageSrc} alt={title} className={styles.image} />
        {internalSelected && (
          <div className={styles.overlay}>
            <Icon name="select" size="2.8rem" color="confeti_lime" />
          </div>
        )}
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default FestivalCard;
