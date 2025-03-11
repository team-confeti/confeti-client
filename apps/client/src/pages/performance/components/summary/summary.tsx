import { Button, LikeButton } from '@confeti/design-system';
import { WEEKDAYS } from '@shared/constants/day.ts';
import { useLikeMutation } from '@shared/hooks/use-like-mutation';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

import * as styles from './summary.css';

interface SummaryProps {
  id: number;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  reservationUrl: string;
  isFavorite: boolean;
  type: 'FESTIVAL' | 'CONCERT';
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
  id,
  title,
  subtitle,
  startAt,
  endAt,
  area,
  reserveAt,
  reservationUrl,
  isFavorite,
  type,
}: SummaryProps) => {
  const { mutate } = useLikeMutation();

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    mutate({ id, action, type });
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.summary}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <div className={styles.titleLeft}>{title}</div>
              <LikeButton
                className={styles.likeButton}
                isFavorite={isFavorite}
                onLikeToggle={handleLike}
                isLoggedIn={!checkIsNotLoggedIn()}
              />
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
          className={styles.linkButton}
          variant="link"
          text={'예매처 바로가기'}
          onClick={() => window.open(reservationUrl, '_blank')}
        />
      </div>
    </section>
  );
};

export default Summary;
