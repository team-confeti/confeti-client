import { getAccessToken } from '@confeti/core/auth';
import { LikeButton } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';
import { formatDate } from '@confeti/utils';

import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { Performance } from '@shared/types/search-response';

import * as styles from './performance-info.css';

const PerformanceInfo = ({
  typeId,
  posterUrl,
  title,
  startAt,
  endAt,
  area,
  isFavorite,
  type,
}: Performance) => {
  const { mutate } = useLikeMutation();
  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    mutate({ id: typeId, action, type: type });
  };

  const navigateToDetail = useNavigateToDetail();
  const formattedDate = formatDate('', 'startEndFull', startAt, endAt);

  return (
    <div className={styles.wrapper}>
      <img
        src={posterUrl}
        alt={title}
        className={styles.poster}
        onClick={() => navigateToDetail(type, typeId)}
      />

      <div className={styles.textSection}>
        <p
          className={styles.title}
          onClick={() => navigateToDetail(type, typeId)}
        >
          {title}
        </p>

        <div className={styles.infoRow}>
          <Icon name="time" size="1.4rem" color="gray600" />
          <p className={styles.infoText}>{formattedDate}</p>
        </div>

        <div className={styles.infoRow}>
          <Icon name="place" size="1.4rem" color="gray600" />
          <p className={styles.infoText}>{area}</p>
        </div>
      </div>

      <LikeButton
        onLikeToggle={handleLike}
        isFavorite={isFavorite}
        className={styles.likeButton}
        isLoggedIn={!!getAccessToken()}
      />
    </div>
  );
};

export default PerformanceInfo;
