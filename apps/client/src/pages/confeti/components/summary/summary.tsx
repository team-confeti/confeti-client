import * as styles from '@pages/confeti/components/summary/summary.css.ts';
import { Button } from '@confeti/design-system';
import {
  BtnHeartDefault24,
  BtnHeartFilled24,
} from '@confeti/design-system/icons';
import { WEEKDAYS } from '@shared/constants/day.ts';

interface SummaryProps {
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  reservationUrl: string;
  isFavorite: boolean; // isFavorite 추가
}

// 날짜 및 시간 포맷팅 함수
const formatReserveDate = (reserveAt: string): string => {
  const date = new Date(reserveAt);

  const weekData = WEEKDAYS;

  const hours = date.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekData[date.getDay()]}) ${period}${hour12}시`;

  return formattedDate;
};

const Summary = ({
  title,
  subtitle,
  startAt,
  endAt,
  area,
  reserveAt,
  reservationUrl,
  isFavorite,
}: SummaryProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.summary}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <div className={styles.titleLeft}>{title}</div>
              {isFavorite ? (
                <BtnHeartFilled24 width={24} height={24} />
              ) : (
                <BtnHeartDefault24 width={24} height={24} />
              )}
            </div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>기간</div>
              <div className={styles.detailContent}>
                {startAt} - {endAt}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>장소</div>
              <div className={styles.detailContent}>{area}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>예매일</div>
              <div className={styles.detailContent}>
                {formatReserveDate(reserveAt)}
              </div>
            </div>
          </div>
        </h1>
        <Button
          className={styles.linkBtn}
          variant="link"
          text={'예매처 바로가기'}
          onClick={() => window.open(reservationUrl, '_blank')}
        />
      </div>
    </section>
  );
};

export default Summary;
