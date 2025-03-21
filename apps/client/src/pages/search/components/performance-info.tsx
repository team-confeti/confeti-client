import { useNavigate } from 'react-router-dom';
import { IcTimeGray14, IcPlaceGray14 } from '@confeti/design-system/icons';
import { LikeButton } from '@confeti/design-system';
import { useLikeMutation } from '@shared/hooks/use-like-mutation';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';
import * as styles from './performance-info.css';
import { formatDate } from '@shared/utils/format-date';

interface PerformanceInfoProps {
  type: 'FESTIVAL' | 'CONCERT' | 'ARTIST';
  typeId: number;
  posterUrl: string;
  title: string;
  performanceStartAt: string;
  performanceEndAt: string;
  area: string;
  isFavorite: boolean;
}

const PerformanceInfo = ({
  typeId,
  posterUrl,
  title,
  performanceStartAt,
  performanceEndAt,
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

  const formattedDate = formatDate(
    '',
    'startEndFull',
    performanceStartAt,
    performanceEndAt,
  );

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
            <p className={styles.infoText}>{formattedDate}</p>
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
