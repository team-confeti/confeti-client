import { PERFORMANCE_LABEL } from '../../constant/performance';

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
        <h2 className={styles.title}> {PERFORMANCE_LABEL.DETAIL_INFO}</h2>
        <div className={styles.content}>
          <div className={styles.detail}>
            <div className={styles.label}>{PERFORMANCE_LABEL.NAME}</div>
            <div className={styles.text}>{title}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.label}> {PERFORMANCE_LABEL.TIME}</div>
            <div className={styles.text}>{time}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.label}> {PERFORMANCE_LABEL.AGERATING}</div>
            <div className={styles.text}>{ageRating}</div>
          </div>
        </div>
      </section>

      {/* 티켓 정보 */}
      <section className={styles.section}>
        <h2 className={styles.title}> {PERFORMANCE_LABEL.TICKET_INFO}</h2>
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
