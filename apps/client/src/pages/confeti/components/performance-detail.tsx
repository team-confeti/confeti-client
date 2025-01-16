import * as styles from '@pages/confeti/components/performance-detail.css';

const PerformanceDetail = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>공연 상세</div>
          <img src="https://ticketimage.interpark.com/Play/image/etc/24/24016171-02.jpg" />
        </div>
        {/* 추후 더보기 버튼 컴포넌트 추가 예정 */}
        <button></button>
      </div>
    </>
  );
};

export default PerformanceDetail;
