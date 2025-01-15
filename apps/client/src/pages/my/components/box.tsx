import { IcArrowGray16 } from '@confeti/design-system/icons';
import * as styles from './box.css';

interface BoxProps {
  title: string;
  children: React.ReactNode;
  showMore?: boolean;
}

const Box = ({ title, children, showMore = false }: BoxProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {showMore && (
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>더보기</button>
            <IcArrowGray16 className={styles.icon} />
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Box;
