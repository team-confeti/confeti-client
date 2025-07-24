import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@confeti/utils';

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
      <p className={styles.text}>{title}</p>
    </label>
  );
};

export default FestivalButton;
