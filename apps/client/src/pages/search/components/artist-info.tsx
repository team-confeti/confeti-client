import { BtnHeartDefault24 } from '@confeti/design-system/icons';
import * as styles from './artist-info.css';

interface ArtistInfoProps {
  image: string;
  name: string;
  releaseDate: string;
}

const ArtistInfo = ({ image, name, releaseDate }: ArtistInfoProps) => {
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
        <BtnHeartDefault24 className={styles.heartIcon} />
      </div>
    </div>
  );
};

export default ArtistInfo;
