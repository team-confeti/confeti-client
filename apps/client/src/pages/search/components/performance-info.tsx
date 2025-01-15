import {
  BtnHeartDefault24,
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
        {/* 포스터 이미지 */}
        <img src={posterUrl} alt={title} className={styles.poster} />

        {/* 텍스트 섹션 */}
        <div className={styles.textSection}>
          <p className={styles.title}>{title}</p>

          {/* 날짜 정보 */}
          <div className={styles.infoRow}>
            <IcTimeGray14 className={styles.infoIcon} />
            <p className={styles.infoText}>{performanceAt}</p>
          </div>

          {/* 위치 정보 */}
          <div className={styles.infoRow}>
            <IcPlaceGray14 className={styles.infoIcon} />
            <p className={styles.infoText}>{area}</p>
          </div>
        </div>

        {/* 좋아요 아이콘 */}
        <BtnHeartDefault24
          className={styles.heartIcon}
          style={{ color: isFavorite ? 'red' : 'gray' }}
        />
      </div>
    </div>
  );
};

export default PerformanceInfo;
