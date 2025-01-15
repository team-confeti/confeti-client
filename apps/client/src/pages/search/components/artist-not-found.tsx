import * as styles from './artist-not-found.css';
import { IcExclamationCircleOutlined32 } from '@confeti/design-system/icons';

const ArtistNotFound = () => {
  return (
    <div className={styles.container}>
      <IcExclamationCircleOutlined32 className={styles.icon} />
      <p className={styles.title}>앗! 검색 결과가 존재하지 않아요</p>
      <p className={styles.subtitle}>단어의 철자가 정확한지 확인해 주세요</p>
    </div>
  );
};

export default ArtistNotFound;
