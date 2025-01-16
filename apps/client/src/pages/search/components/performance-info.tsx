import {
  BtnHeartDefault24,
  BtnHeartFilled24,
  IcTimeGray14,
  IcPlaceGray14,
} from '@confeti/design-system/icons';
import * as styles from './performance-info.css';

interface PerformanceInfoProps {
  posterUrl: string;
  title: string;
  performanceAt: string;
  area: string;
  isFavorite: boolean;
}

const PerformanceInfo = ({
  posterUrl,
  title,
  performanceAt,
  area,
  isFavorite,
}: PerformanceInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={posterUrl} alt={title} className={styles.poster} />

        <div className={styles.textSection}>
          <p className={styles.title}>{title}</p>

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
