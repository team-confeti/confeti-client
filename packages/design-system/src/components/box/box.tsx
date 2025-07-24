import { type ReactNode } from 'react';

import { cn } from '@confeti/utils';

import { Icon } from '../../icons';

import * as styles from './box.css';

interface Props {
  title: string;
  titleSize?: 'md' | 'lg';
  subtitle?: string;
  subtitleIcon?: ReactNode;
  showMoreText?: string;
  onShowMore?: () => void;
  children: ReactNode;
  className?: string;
}

const Box = ({
  title,
  titleSize = 'md',
  subtitle,
  subtitleIcon,
  showMoreText,
  onShowMore,
  children,
  className,
  ...props
}: Props) => {
  return (
    <section className={cn(styles.boxVariants(), className)} {...props}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitleIcon}
              {subtitle}
            </div>
          )}
          <h3 className={styles.titleVariants({ titleSize })}>{title}</h3>
        </div>
        {onShowMore && (
          <div className={styles.buttonWrapper}>
            <button onClick={onShowMore} className={styles.button}>
              {showMoreText}
            </button>
            <Icon name="arrow-horizontal" size="1.2rem" color="gray500" />
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Box;
