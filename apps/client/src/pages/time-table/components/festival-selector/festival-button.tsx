import { ButtonHTMLAttributes } from 'react';

import { cn } from '@confeti/design-system/utils';

import * as styles from './festival-button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  imgUrl: string;
  title: string;
  className?: string;
  isDeleteMode?: boolean;
  isChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const FestivalButton = ({
  className,
  isSelected,
  imgUrl,
  title,
  isDeleteMode = false,
  isChecked,
  onCheckChange,
  ...props
}: Props) => {
  return (
    <label className={cn(styles.buttonContainer, className)}>
      {isDeleteMode && (
        <>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheckChange?.(!isChecked)}
            className={styles.checkBox}
          />
        </>
      )}
      <button className={styles.festivalButton({ isSelected })} {...props}>
        <img src={imgUrl} alt={title} />
      </button>
      <span className={styles.text}>{title}</span>
    </label>
  );
};

export default FestivalButton;
