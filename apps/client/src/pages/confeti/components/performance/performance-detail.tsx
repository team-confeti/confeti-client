import * as styles from '@pages/confeti/components/performance/performance-detail.css.ts';

interface PerformanceDetailProps {
  title: string;
  infoImgUrl: string;
  isExpanded: boolean;
}

const PerformanceDetail = ({
  isExpanded,
  infoImgUrl,
  title,
}: PerformanceDetailProps) => {
  return (
    <div
      className={`${styles.container} ${
        isExpanded ? styles.expanded : styles.collapsed
      }`}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>공연 상세</h2>
        <img src={infoImgUrl} alt={title} />
      </div>
    </div>
  );
};

export default PerformanceDetail;
