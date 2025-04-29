import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@confeti/design-system/utils';

import * as styles from './festival-button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  imgUrl: string;
  title: string;
  className?: string;
  children?: ReactNode;
}

const FestivalButton = ({
  className,
  isSelected,
  imgUrl,
  title,
  children,
  ...props
}: Props) => {
  return (
    <label className={cn(styles.buttonContainer, className)}>
      {children}
      <button className={styles.festivalButton({ isSelected })} {...props}>
        <img src={imgUrl} alt={title} />
      </button>
      <span className={styles.text}>{title}</span>
    </label>
  );
};

export default FestivalButton;
