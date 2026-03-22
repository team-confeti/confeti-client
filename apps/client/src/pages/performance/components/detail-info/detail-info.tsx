import * as styles from './detail-info.css';
interface DetailInfoProps {
  title: string;
  time: string;
  ageRating: string;
  price: string;
}

const DetailInfo = ({ title, time, ageRating, price }: DetailInfoProps) => {
  const priceLines = price.split('\n');

  return (
    <section className={styles.container}>
      {/* 상세 정보 */}
      <section className={styles.section}>
        <h2 className={styles.title}>상세 정보</h2>
        <div className={styles.content}>
          <div className={styles.detail}>
            <div className={styles.label}>공연 이름</div>
            <div className={styles.text}>{title}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.label}>공연 시간</div>
            <div className={styles.text}>{time}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.label}>관람 등급</div>
            <div className={styles.text}>{ageRating}</div>
          </div>
        </div>
      </section>

      {/* 티켓 정보 */}
      <section className={styles.section}>
        <h2 className={styles.title}>티켓 정보</h2>
        <div className={styles.priceContent}>
          {priceLines.map((line, index) => (
            <div key={index} className={styles.priceDetail}>
              {line}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default DetailInfo;
