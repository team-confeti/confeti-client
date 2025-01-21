import { BtnHeart } from '@confeti/design-system/icons';
import * as styles from './artist-info.css';
import { useLikeMutation } from '@shared/hooks/use-like-mutation';

interface ArtistInfoProps {
  id: string;
  image: string;
  name: string;
  releaseDate: string;
  isFavorite: boolean;
}

const ArtistInfo = ({
  id,
  image,
  name,
  releaseDate,
  isFavorite,
}: ArtistInfoProps) => {
  const { mutate } = useLikeMutation();

  const handleLikeArtist = (id: string, action: 'LIKE' | 'UNLIKE') => {
    mutate({ id, action, type: 'ARTIST' });
  };

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

        <BtnHeart
          isFavorite={isFavorite}
          className={styles.heartIcon}
          onClick={() => handleLikeArtist(id, isFavorite ? 'UNLIKE' : 'LIKE')}
        />
      </div>
    </div>
  );
};

export default ArtistInfo;
