import { Icon } from '../../icons';

import * as styles from './artist-card.css';

interface ArtistCardProps {
  artistId: string;
  title: string;
  imageSrc: string;
  size: 'sm' | 'md' | 'lg';
}

const ArtistCard = ({ title, imageSrc, size = 'lg' }: ArtistCardProps) => {
  return (
    <div className={styles.artistCardVariants()}>
      <div className={styles.imageAndHeartWrapper}>
        <img className={styles.artistImg()} src={imageSrc} alt={title} />
        {size === 'md' && <Icon name="heart" className={styles.heartImg} />}
      </div>
      <p className={styles.artistName({ size })}>{title}</p>
    </div>
  );
};

export default ArtistCard;
