import { useState, useEffect } from 'react';
import * as styles from './festival-card.css';
import { IcSelect } from '../../icons/src';
import { toast } from '@confeti/design-system';

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

    // 선택된 카드 개수 체크
    const selectedCount = document.querySelectorAll(
      '[aria-pressed="true"]',
    ).length;

    if (internalSelected) {
      // 이미 선택된 카드라면 선택 취소
      setInternalSelected(false);
      onSelectChange && onSelectChange(festivalId, false);
    } else {
      if (selectedCount < 3) {
        // 3개 미만이면 선택
        setInternalSelected(true);
        onSelectChange && onSelectChange(festivalId, true);
      } else {
        // 4개 이상이면 선택 불가
        toast.default('페스티벌은 3개까지만 추가할 수 있어요.', {
          position: 'middleCenter',
        });
      }
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
