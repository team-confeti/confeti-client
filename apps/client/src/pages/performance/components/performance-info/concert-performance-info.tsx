import { getAccessToken } from '@confeti/core/auth';
import { LikeButton } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { logClickEvent } from '@shared/analytics/logging';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import type { ReservationSchedule } from '@shared/types/performance-common';

import * as styles from './performance-info.css';

interface ConcertPerformanceInfoProps {
  id: number;
  startAt: string;
  endAt: string;
  area: string;
  reservationSchedules: ReservationSchedule[];
  isFavorite: boolean;
}

const ConcertPerformanceInfo = ({
  id,
  startAt,
  endAt,
  area,
  reservationSchedules,
  isFavorite,
}: ConcertPerformanceInfoProps) => {
  const { mutate } = useLikeMutation();
  const formattedDate = formatDate('', 'rangeStartYearOnly', startAt, endAt);

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    logClickEvent({
      name: 'click_like_performance',
      params: {
        action,
        target_type: 'CONCERT',
        target_id: id,
      },
    });
    mutate({ id, action, type: 'CONCERT' });
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
              <div className={styles.detailTitle}>예매 일정</div>
              <div className={styles.detailContentList}>
                {reservationSchedules.length > 0 ? (
                  reservationSchedules.map((schedule) => (
                    <div
                      key={`${schedule.roundName}-${schedule.reserveAt}`}
                      className={styles.detailContent}
                    >
                      {schedule.roundName
                        ? `${schedule.roundName} · ${formatDate(
                            schedule.reserveAt,
                            'koFullDateTimeWithWeekday',
                          )}`
                        : formatDate(
                            schedule.reserveAt,
                            'koFullDateTimeWithWeekday',
                          )}
                    </div>
                  ))
                ) : (
                  <div className={styles.detailContent}>-</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ConcertPerformanceInfo;
