import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../../icons';

import * as styles from './festival-card.css';

interface FestivalCardProps {
  typeId: number;
  title: string;
  imageSrc?: string;
  isSelected?: boolean;
  selectable?: boolean;
  onSelectChange?: (title: string, isSelected: boolean) => void;
  type?: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  onClick?: () => void;
}

const FestivalCard = ({
  title,
  imageSrc = 'https://dummyimage.com/100x142',
  isSelected = false,
  selectable = false,
  onSelectChange,
  typeId,
  type,
  onClick,
}: FestivalCardProps) => {
  const [internalSelected, setInternalSelected] = useState(isSelected);
  const navigate = useNavigate();
  const detailRoutePath = `/${type?.toLowerCase()}-detail/${typeId}`;

  const handleClick = () => {
    if (selectable) {
      const toggledSelected = !internalSelected;
      setInternalSelected(toggledSelected);

      if (onSelectChange) {
        onSelectChange(title, toggledSelected);
      }
    }

    if (onClick) {
      onClick();
    } else if (!selectable) {
      navigate(detailRoutePath);
    }
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
