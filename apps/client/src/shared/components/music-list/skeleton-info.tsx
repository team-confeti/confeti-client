import { Skeleton } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './music-info.css';

const SkeletonInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.slideSection}>
        <div className={styles.poster}>
          <Skeleton width={'10rem'} height={'14.2rem'} />
        </div>
        <div className={styles.textSection}>
          <Skeleton width={'21rem'} height={'1.9rem'} />
          <div className={styles.buttonSection}>
            <p className={styles.buttonText}>공연 상세정보 확인하기</p>
            <Icon name="arrow-horizontal" size={12} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonInfo;
