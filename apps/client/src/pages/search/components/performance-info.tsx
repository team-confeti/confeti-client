import {
  BtnHeartDefault24,
  BtnHeartFilled24,
  IcTimeGray14,
  IcPlaceGray14,
} from '@confeti/design-system/icons';
import * as styles from './performance-info.css';
import { useNavigate } from 'react-router-dom';

interface PerformanceInfoProps {
  type?: string;
  performanceId: number;
  posterUrl: string;
  title: string;
  performanceAt: string;
  area: string;
  isFavorite: boolean;
}

const PerformanceInfo = ({
  performanceId,
  posterUrl,
  title,
  performanceAt,
  area,
  isFavorite,
  type,
}: PerformanceInfoProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const path =
      type === 'concert'
        ? `/concert-detail/${performanceId}`
        : `/festival-detail/${performanceId}`;
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

        {isFavorite ? (
          <BtnHeartFilled24 className={styles.heartIcon} />
        ) : (
          <BtnHeartDefault24 className={styles.heartIcon} />
        )}
      </div>
    </div>
  );
};

export default PerformanceInfo;
