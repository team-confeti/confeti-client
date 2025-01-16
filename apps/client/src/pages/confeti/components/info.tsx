import * as styles from '@pages/confeti/components/info.css';

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
  // `price`를 분리하여 배열로 변환
  const priceLines = price.split('\n');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.performanceInfo}>
          <div className={styles.title}>공연 정보</div>
          <div className={styles.content}>
            <div className={styles.subtitle}>
              <div className={styles.subtitleTitle}>공연 이름</div>
              <div className={styles.subtitleContent}>{subtitle}</div>
            </div>
            <div className={styles.area}>
              <div className={styles.areaTitle}>장소</div>
              <div className={styles.areaContent}>{area}</div>
            </div>
            <div className={styles.date}>
              <div className={styles.dateTitle}>공연 기간</div>
              <div className={styles.dateContent}>
                {startAt} - {endAt}
              </div>
            </div>
            <div className={styles.time}>
              <div className={styles.timeTitle}>공연 시간</div>
              <div className={styles.timeContent}>{time}</div>
            </div>
            <div className={styles.ageRating}>
              <div className={styles.ageRatingTitle}>관람 등급</div>
              <div className={styles.ageRatingContent}>{ageRating}</div>
            </div>
            <div className={styles.reservationOffice}>
              <div className={styles.reservationOfficeTitle}>예매처</div>
              <div className={styles.reservationOfficeContent}>
                {reservationOffice}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ticketInfo}>
          <div className={styles.title}>티켓 정보</div>
          <div className={styles.price}>
            <div className={styles.priceTitle}>가격</div>
            <div className={styles.priceContent}>
              {priceLines.map((line, index) => (
                <div className={styles.priceDetail} key={index}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
