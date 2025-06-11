import { Icon } from '@confeti/design-system/icon';

import { SEARCH_NOT_FOUND_MESSAGE } from '../../../constants/notice-message';

import * as styles from './artist-not-found.css';

const ArtistNotFound = () => {
  return (
    <div className={styles.container}>
      <Icon name="warning" size="6rem" color="gray400" />
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
