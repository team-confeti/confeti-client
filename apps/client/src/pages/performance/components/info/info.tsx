import { formatDate } from '@shared/utils/format-date';

import { PERFORMANCE_LABEL } from '../../constant/performance';

import * as styles from './info.css';

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
  const priceLines = price.split('\n');
  const formattedDate = formatDate('', 'startEndHalf', startAt, endAt);

  return (
    <>
      <section className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.title()}>
            {PERFORMANCE_LABEL.PERFORMANCE_INFO}
          </h2>
          <div className={styles.content}>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {PERFORMANCE_LABEL.PERFORMANCE_NAME}
              </div>
              <div className={styles.text()}>{subtitle}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {PERFORMANCE_LABEL.PLACE}
              </div>
              <div className={styles.text()}>{area}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {PERFORMANCE_LABEL.PERIOD}
              </div>
              <div className={styles.text()}>{formattedDate}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {PERFORMANCE_LABEL.TIME}
              </div>
              <div className={styles.text()}>{time}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {PERFORMANCE_LABEL.AGERATING}
              </div>
              <div className={styles.text()}>{ageRating}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                {PERFORMANCE_LABEL.RESERVATIONOFFICE}
              </div>
              <div className={styles.text()}>{reservationOffice}</div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.title()}>{PERFORMANCE_LABEL.TICKET_INFO}</div>
          <div className={styles.detail}>
            <div className={styles.text({ type: 'label', color: 'gray' })}>
              {PERFORMANCE_LABEL.PRICE}
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
