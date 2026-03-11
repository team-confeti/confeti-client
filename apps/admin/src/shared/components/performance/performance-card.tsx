import { Calendar, ChevronRight, MapPin, Music } from 'lucide-react';

import type { PerformanceCardData } from '@shared/models/performance-card';

import * as styles from './performance-card.css';

interface Props {
  data: PerformanceCardData;
  onClick: () => void;
  isPast?: boolean;
}

const PerformanceCard = ({ data, onClick, isPast = false }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${isPast ? styles.pastCard : ''}`}
    >
      <div className={styles.imageContainer}>
        {data.image ? (
          <img src={data.image} alt={data.title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <Music size={48} />
          </div>
        )}
        <div
          className={`${styles.typeBadge} ${data.type === 'Festival' ? styles.typeBadgeFestival : styles.typeBadgeConcert}`}
        >
          {data.type === 'Festival' ? '페스티벌' : '콘서트'}
        </div>
        {isPast && (
          <div className={styles.pastOverlay}>
            <span className={styles.pastLabel}>종료된 공연</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.subtitle}>{data.subtitle || '부제 없음'}</p>

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <Calendar size={14} />
            <span>
              {data.startDate || data.date}{' '}
              {data.endDate ? `~ ${data.endDate}` : ''}
            </span>
          </div>
          <div className={styles.infoItem}>
            <MapPin size={14} />
            <span>{data.venueName || '장소 미정'}</span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <span
          className={`${styles.statusBadge} ${isPast ? styles.pastStatus : ''}`}
        >
          {isPast ? '종료됨' : '게시됨'}
        </span>
        <ChevronRight size={16} className={styles.chevron} />
      </div>
    </div>
  );
};

export default PerformanceCard;
