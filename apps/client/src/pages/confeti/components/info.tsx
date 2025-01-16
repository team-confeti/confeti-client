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
  // 'price'를 분리하여 배열로 변환
  const priceLines = price.split('\n');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.title()}>공연 정보</div>
          <div className={styles.content}>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                공연 이름
              </div>
              <div className={styles.text()}>{subtitle}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                장소
              </div>
              <div className={styles.text()}>{area}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                공연 기간
              </div>
              <div className={styles.text()}>
                {startAt} - {endAt}
              </div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                공연 시간
              </div>
              <div className={styles.text()}>{time}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                관람 등급
              </div>
              <div className={styles.text()}>{ageRating}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.text({ type: 'label', color: 'gray' })}>
                예매처
              </div>
              <div className={styles.text()}>{reservationOffice}</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.title()}>티켓 정보</div>
          <div className={styles.detail}>
            <div className={styles.text({ type: 'label', color: 'gray' })}>
              가격
            </div>
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
