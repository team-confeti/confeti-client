import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { IcArrowGray16 } from '@confeti/design-system/icons';

import { cn } from '../../utils';

import * as styles from './box.css';

interface Props {
  title: string;
  subtitle?: string;
  titleSize?: 'md' | 'lg';
  path?: string;
  showMore?: boolean;
  showMoreText?: string;
  children: ReactNode;
  className?: string;
}

const Box = ({
  title,
  titleSize = 'md',
  subtitle,
  path,
  showMore,
  showMoreText,
  className,
  children,
  ...props
}: Props) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <section className={cn(styles.boxVariants(), className)} {...props}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <h3 className={styles.titleVariants({ titleSize })}>{title}</h3>
        </div>
        {showMore && (
          <div className={styles.buttonWrapper}>
            <button onClick={handleShowMore} className={styles.button}>
              {showMoreText}
            </button>
            <IcArrowGray16 width="1.2rem" height="1.2rem" />
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Box;
