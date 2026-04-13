import { getAccessToken } from '@confeti/core/auth';
import { LikeButton } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { logClickEvent } from '@shared/analytics/logging';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { isEmpty } from '@shared/lib/es-toolkit/es';
import type { ReservationSchedule } from '@shared/types/performance-common';

import * as styles from './performance-info.css';

const WHEELCHAIR_ROUND_NAME = '휠체어석';
const WHEELCHAIR_NOTICE = '* 자세한 사항은 예매처를 참조해주세요.';

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
              <div className={styles.detailTitle}>예매일</div>
              <div className={styles.detailContentList}>
                {isEmpty(reservationSchedules) && (
                  <div className={styles.detailContent}>-</div>
                )}
                {reservationSchedules.map((schedule) => (
                  <div
                    key={`${schedule.roundName}-${schedule.reserveAt}`}
                    className={styles.reservationScheduleItem}
                  >
                    <div
                      className={`${styles.detailContent} ${styles.reservationSchedule}`}
                    >
                      <span className={styles.reservationRoundName}>
                        {schedule.roundName}
                      </span>
                      <span>
                        {formatDate(
                          schedule.reserveAt,
                          'koFullDateTimeWithWeekday',
                        )}
                      </span>
                    </div>
                    {schedule.roundName === WHEELCHAIR_ROUND_NAME && (
                      <div className={styles.reservationScheduleNotice}>
                        {WHEELCHAIR_NOTICE}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ConcertPerformanceInfo;
