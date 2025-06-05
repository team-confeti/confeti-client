import { LikeButton } from '@confeti/design-system';
import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

import * as styles from './artist-info.css';

interface ArtistInfoProps {
  id: string;
  image: string;
  name: string;
  recentAlbumName: string;
  isFavorite: boolean;
  refetchArtist?: () => void;
}

const ArtistInfo = ({
  id,
  image,
  name,
  recentAlbumName,
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
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.textSection}>
        <p className={styles.name}>{name}</p>
        <div className={styles.releaseWrapper}>
          <span>최근 발매 앨범: &nbsp;</span>
          <span>{recentAlbumName}</span>
        </div>
      </div>
      <LikeButton
        className={styles.likeButton}
        isFavorite={isFavorite}
        onLikeToggle={handleLike}
        isLoggedIn={!checkIsNotLoggedIn()}
      />
    </div>
  );
};

export default ArtistInfo;
