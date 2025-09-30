import { DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import * as styles from './music-info.css';

const MusicInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.poster}></div>
        <div className={styles.textSection}>
          <p className={styles.title}>
            DAY6 3RD WORLD TOUR〈FOREVER YOUNG〉in BUSAN
          </p>
          <div className={styles.buttonSection}>
            <p className={styles.buttonText}>공연 상세정보 확인하기</p>
            <Icon name="arrow-horizontal" size={12} color="white" />
          </div>
        </div>
      </div>

      <DotIndicator total={3} current={0} />
    </div>
  );
};

export default MusicInfo;
