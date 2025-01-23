import { LikeButton } from '@confeti/design-system';
import { useLikeMutation } from '@shared/hooks/use-like-mutation';
import * as styles from './artist-info.css';

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

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
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

        <LikeButton
          className={styles.likeButton}
          isFavorite={isFavorite}
          onLikeToggle={handleLike}
        />
      </div>
    </div>
  );
};

export default ArtistInfo;
