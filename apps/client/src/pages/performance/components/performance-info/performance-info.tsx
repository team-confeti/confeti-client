import { LikeButton } from '@confeti/design-system';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';
import { formatDate } from '@shared/utils/format-date';

import { PERFORMANCE_LABEL } from '../../constant/performance';

import * as styles from './performance-info.css';

interface Props {
  id: number;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  isFavorite: boolean;
  type: 'FESTIVAL' | 'CONCERT';
}

const PerformanceInfo = ({
  id,
  startAt,
  endAt,
  area,
  reserveAt,
  isFavorite,
  type,
}: Props) => {
  const { mutate } = useLikeMutation();
  const formattedDate = formatDate('', 'startEndHalf', startAt, endAt);
  const formattedReserveDate = formatDate(reserveAt, 'koFull');

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    mutate({ id, action, type });
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {PERFORMANCE_LABEL.PERFORMANCE_INFO}
          </h2>
          <LikeButton
            className={styles.likeButton}
            isFavorite={isFavorite}
            onLikeToggle={handleLike}
            isLoggedIn={!checkIsNotLoggedIn()}
          />
        </div>

        <div className={styles.detail}>
          <div className={styles.detailItem}>
            <div className={styles.detailTitle}>{PERFORMANCE_LABEL.PERIOD}</div>
            <div className={styles.detailContent}>{formattedDate}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailTitle}>{PERFORMANCE_LABEL.PLACE}</div>
            <div className={styles.detailContent}>{area}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailTitle}>
              {PERFORMANCE_LABEL.TICKETING_DATE}
            </div>
            <div className={styles.detailContent}>{formattedReserveDate}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceInfo;
