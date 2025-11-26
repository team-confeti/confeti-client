import { DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './music-info.css';

interface MusicInfoProps {
  title: string;
  posterUrl: string;
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
  onClickDetail?: () => void;
}

const MusicInfo = ({
  title,
  posterUrl,
  total,
  current,
  onDotClick,
  onClickDetail,
}: MusicInfoProps) => {
  const showDots = total > 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <img src={posterUrl} className={styles.poster} />
        </div>
        <div className={styles.textSection}>
          <p className={styles.title}>{title}</p>
          <div className={styles.buttonSection}>
            <p className={styles.buttonText} onClick={onClickDetail}>
              공연 상세정보 확인하기
            </p>
            <Icon name="arrow-horizontal" size={12} color="white" />
          </div>
        </div>
      </div>
      {showDots && (
        <DotIndicator total={total} current={current} onDotClick={onDotClick} />
      )}
    </div>
  );
};

export default MusicInfo;
