import * as styles from './artist-title.css.ts';

const ARTIST_TITLE_TEXT = '아티스트';

const ArtistTitle = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{ARTIST_TITLE_TEXT}</h2>
    </section>
  );
};

export default ArtistTitle;
