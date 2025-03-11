import { LikeButton } from '@confeti/design-system';
import { IcPlaceGray14, IcTimeGray14 } from '@confeti/design-system/icons';
import { useLikeMutation } from '@shared/hooks/use-like-mutation';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';
import { useNavigate } from 'react-router-dom';

import * as styles from './performance-info.css';

interface PerformanceInfoProps {
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  typeId: number;
  posterUrl: string;
  title: string;
  performanceAt: string;
  area: string;
  isFavorite: boolean;
}

const PerformanceInfo = ({
  typeId,
  posterUrl,
  title,
  performanceAt,
  area,
  isFavorite,
  type,
}: PerformanceInfoProps) => {
  const navigate = useNavigate();
  const { mutate } = useLikeMutation();

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    mutate({ id: typeId, action, type: type });
  };

  const handleNavigation = () => {
    const path =
      type === 'CONCERT'
        ? `/concert-detail/${typeId}`
        : `/festival-detail/${typeId}`;
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src={posterUrl}
          alt={title}
          className={styles.poster}
          onClick={handleNavigation}
        />

        <div className={styles.textSection}>
          <p className={styles.title} onClick={handleNavigation}>
            {title}
          </p>

          <div className={styles.infoRow}>
            <IcTimeGray14 className={styles.infoIcon} />
            <p className={styles.infoText}>{performanceAt}</p>
          </div>

          <div className={styles.infoRow}>
            <IcPlaceGray14 className={styles.infoIcon} />
            <p className={styles.infoText}>{area}</p>
          </div>
        </div>

        <LikeButton
          onLikeToggle={handleLike}
          isFavorite={isFavorite}
          className={styles.likeButton}
          isLoggedIn={!checkIsNotLoggedIn()}
        />
      </div>
    </div>
  );
};

export default PerformanceInfo;
