import * as styles from '@pages/confeti/components/performance-detail.css';

interface PerformanceDetailProps {
  isExpanded: boolean;
}

const PerformanceDetail = ({ isExpanded }: PerformanceDetailProps) => {
  return (
    <div
      className={`${styles.container} ${
        isExpanded ? styles.expanded : styles.collapsed
      }`}
    >
      <div className={styles.wrapper}>
        <div className={styles.title}>공연 상세</div>
        <img
          src="https://ticketimage.interpark.com/Play/image/etc/24/24016171-02.jpg"
          alt="공연 상세 이미지"
        />
      </div>
    </div>
  );
};

export default PerformanceDetail;
