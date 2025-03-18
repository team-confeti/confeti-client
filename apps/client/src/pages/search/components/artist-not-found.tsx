import { IcExclamationCircleOutlined32 } from '@confeti/design-system/icons';

import { SEARCH_NOT_FOUND_MESSAGE } from '../constants/notice-message';

import * as styles from './artist-not-found.css';

const ArtistNotFound = () => {
  return (
    <div className={styles.container}>
      <IcExclamationCircleOutlined32 className={styles.icon} />
      <p className={styles.title}>
        {SEARCH_NOT_FOUND_MESSAGE.ARTIST_NOT_FOUND_TITLE}
      </p>
      <p className={styles.subtitle}>
        {SEARCH_NOT_FOUND_MESSAGE.ARTIST_NOT_FOUND_SUBTITLE}
      </p>
    </div>
  );
};

export default ArtistNotFound;
