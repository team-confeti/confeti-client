import {
  BtnHeartDefault24,
  BtnHeartFilled24,
} from '@confeti/design-system/icons';
import * as styles from './artist-info.css';

interface ArtistInfoProps {
  image: string;
  name: string;
  releaseDate: string;
  isFavorite: boolean;
}

const ArtistInfo = ({
  image,
  name,
  releaseDate,
  isFavorite,
}: ArtistInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={image} alt={name} className={styles.image} />

        <div className={styles.textSection}>
          <p className={styles.name}>{name}</p>
          <div className={styles.releaseWrapper}>
            <span className={styles.releaseLabel}>최근 발매일</span>
            <span className={styles.releaseDate}>{releaseDate}</span>
          </div>
        </div>

        {isFavorite ? (
          <BtnHeartFilled24 className={styles.heartIcon} />
        ) : (
          <BtnHeartDefault24 className={styles.heartIcon} />
        )}
      </div>
    </div>
  );
};

export default ArtistInfo;
