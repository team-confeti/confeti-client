import * as styles from '@pages/confeti/components/info/info.css';
import { CONFETI_LABEL } from '../../constant/confeti';

interface InfoProps {
  subtitle: string;
  area: string;
  startAt: string;
  endAt: string;
  time: string;
  ageRating: string;
  reservationOffice: string;
  price: string;
}

const Info = ({
  subtitle,
  area,
  startAt,
  endAt,
  time,
  ageRating,
  reservationOffice,
  price,
}: InfoProps) => {
  // 'price'를 분리하여 배열로 변환
  const priceLines = price.split('\n');

  return (
    <>
      <section className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.title()}>{CONFETI_LABEL.PERFORMANCE_INFO}</h2>
          <div className={styles.content}>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {CONFETI_LABEL.PERFORMANCE_NAME}
              </div>
              <div className={styles.text()}>{subtitle}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {CONFETI_LABEL.PLACE}
              </div>
              <div className={styles.text()}>{area}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {CONFETI_LABEL.PERIOD}
              </div>
              <div className={styles.text()}>
                {startAt} - {endAt}
              </div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {CONFETI_LABEL.TIME}
              </div>
              <div className={styles.text()}>{time}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {CONFETI_LABEL.AGERATING}
              </div>
              <div className={styles.text()}>{ageRating}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {CONFETI_LABEL.RESERVATIONOFFICE}
              </div>
              <div className={styles.text()}>{reservationOffice}</div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.title()}>{CONFETI_LABEL.TICKET_INFO}</div>
          <div className={styles.detail}>
            <div className={styles.text({ type: 'label', color: 'gray' })}>
              {CONFETI_LABEL.PRICE}
            </div>
            <div className={styles.priceContent}>
              {priceLines.map((line, index) => (
                <div className={styles.priceDetail} key={index}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Info;
