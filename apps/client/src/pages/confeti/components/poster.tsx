import * as styles from '@pages/confeti/components/poster.css';
interface Props {
  posterBgUrl: string;
  posterUrl: string;
}

const Poster = ({ posterBgUrl, posterUrl }: Props) => {
  return (
    <div className={styles.container}>
      <img className={styles.posterBg} src={posterBgUrl} />
      <img className={styles.poster} src={posterUrl} alt="poster" />
    </div>
  );
};

export default Poster;
