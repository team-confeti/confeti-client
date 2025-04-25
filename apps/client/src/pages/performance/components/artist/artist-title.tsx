import { PERFORMANCE_LABEL } from '../../constant/performance';

import * as styles from './artist-title.css';

const ArtistTitle = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{PERFORMANCE_LABEL.ARTIST}</h2>
    </section>
  );
};

export default ArtistTitle;
