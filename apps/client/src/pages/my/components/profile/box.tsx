import { IcArrowGray16 } from '@confeti/design-system/icons';
import { useNavigate } from 'react-router-dom';

import * as styles from './box.css';

interface BoxProps {
  title: string;
  path: string;
  showMore?: boolean;
  children: React.ReactNode;
}

const Box = ({ title, path, showMore = false, children }: BoxProps) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
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
            <IcArrowGray16 className={styles.icon} />
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Box;
