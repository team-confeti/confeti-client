import * as styles from '@pages/confeti/components/summary.css';
import Button from '../../../../../../packages/design-system/src/components/button/button';
import { BtnHeartDefault24 } from 'node_modules/@confeti/design-system/src/icons/src';

interface SummaryProps {
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  reservationUrl: string;
}

// 날짜 및 시간 포맷팅 함수
const formatReserveDate = (reserveAt: string): string => {
  const date = new Date(reserveAt);

  // 요일 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 12시간제 계산
  const hours = date.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  // 최종 포맷
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay()]}) ${period}${hour12}시`;

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
}: SummaryProps) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.summary}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>
                <div className={styles.titleLeft}>{title}</div>
                <BtnHeartDefault24 width={24} height={24} />
              </div>
              <div className={styles.subtitle}>{subtitle}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.date}>
                <div className={styles.dateTitle}>기간</div>
                <div className={styles.dateContent}>
                  {startAt} - {endAt}
                </div>
              </div>
              <div className={styles.area}>
                <div className={styles.areaTitle}>장소</div>
                <div className={styles.areaContent}>{area}</div>
              </div>
              <div className={styles.reserveAt}>
                <div className={styles.reserveAtTitle}>예매일</div>
                <div className={styles.reserveAtContent}>
                  {formatReserveDate(reserveAt)}
                </div>
              </div>
            </div>
          </div>
          <Button variant="link" text={'예매처 바로가기'} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
