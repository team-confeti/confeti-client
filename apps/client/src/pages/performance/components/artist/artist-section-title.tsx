import { PERFORMANCE_LABEL } from '@pages/performance/constant/performance';

import * as styles from './artist-section-title.css';

const ArtistSectionTitle = () => {
  return <h2 className={styles.ArtistTitle}>{PERFORMANCE_LABEL.ARTIST}</h2>;
};

export default ArtistSectionTitle;
