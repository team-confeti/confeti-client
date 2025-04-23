import { ButtonHTMLAttributes } from 'react';

import { cn } from '@confeti/design-system/utils';

import * as styles from './festival-button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  imgUrl: string;
  title: string;
  className?: string;
}

const FestivalButton = ({
  className,
  isSelected,
  imgUrl,
  title,
  ...props
}: Props) => {
  return (
    <div className={cn(styles.buttonContainer, className)}>
      <button className={styles.festivalButton({ isSelected })} {...props}>
        <img src={imgUrl} alt={title} />
      </button>
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default FestivalButton;
