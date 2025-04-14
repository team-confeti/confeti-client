import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { IcArrowGray16 } from '@confeti/design-system/icons';

import * as styles from './box.css';

interface BoxProps {
  title: string;
  path?: string;
  showMore?: boolean;
  children: ReactNode;
}

const Box = ({ title, path, showMore = false, children }: BoxProps) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    if (!path) return;

    navigate(path);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {showMore && (
          <div className={styles.buttonWrapper}>
            <button onClick={handleShowMore} className={styles.button}>
              더보기
            </button>
            <IcArrowGray16 width={'1.2rem'} height={'1.2rem'} />
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Box;
