import { getAccessToken } from '@confeti/core/auth';
import { Avatar, LikeButton } from '@confeti/design-system';

import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';

import * as styles from './artist-info.css';

interface ArtistInfoProps {
  id: string;
  image: string;
  name: string;
  isFavorite: boolean;
  refetchArtist?: () => void;
}

const ArtistInfo = ({
  id,
  image,
  name,
  isFavorite,
  refetchArtist,
}: ArtistInfoProps) => {
  const { mutate } = useLikeMutation();

  const handleLike = (action: 'LIKE' | 'UNLIKE') => {
    mutate({ id, action, type: 'ARTIST' });
    refetchArtist?.();
  };

  return (
    <div className={styles.wrapper}>
      <Avatar src={image} alt={name} size="xl" isHandleClick={false} />
      <div className={styles.textSection}>
        <p className={styles.name}>{name}</p>
      </div>
      <LikeButton
        className={styles.likeButton}
        isFavorite={isFavorite}
        onLikeToggle={handleLike}
        isLoggedIn={!!getAccessToken()}
      />
    </div>
  );
};

export default ArtistInfo;
