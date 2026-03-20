import { getAccessToken } from '@confeti/core/auth';
import { Button, LikeButton } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { logClickEvent } from '@shared/analytics/logging';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';

import * as styles from './performance-info.css';

interface FestivalPerformanceInfoProps {
  id: number;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  isFavorite: boolean;
}

const FestivalPerformanceInfo = ({
  id,
  startAt,
  endAt,
  area,
  reserveAt,
  isFavorite,
}: FestivalPerformanceInfoProps) => {
  const { mutate } = useLikeMutation();
  const formattedDate = formatDate('', 'rangeStartYearOnly', startAt, endAt);
  const formattedReserveDate = formatDate(
    reserveAt,
    'koFullDateTimeWithWeekday',
  );

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    logClickEvent({
      name: 'click_like_performance',
      params: {
        action,
        target_type: 'FESTIVAL',
        target_id: id,
      },
    });
    mutate({ id, action, type: 'FESTIVAL' });
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <section className={styles.contentContainer}>
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>공연 정보</h2>
            <LikeButton
              className={styles.likeButton}
              isFavorite={isFavorite}
              onLikeToggle={handleLike}
              isLoggedIn={!!getAccessToken()}
            />
          </div>

          <div className={styles.detail}>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>기간</div>
              <div className={styles.detailContent}>{formattedDate}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>장소</div>
              <div className={styles.detailContent}>{area}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailTitle}>예매일</div>
              <div className={styles.detailContent}>{formattedReserveDate}</div>
            </div>
          </div>

          <Button text="내 타임테이블 만들기" variant="add" />
        </section>
      </div>
    </section>
  );
};

export default FestivalPerformanceInfo;
