import { getAccessToken } from '@confeti/core/auth';
import { Avatar, LikeButton } from '@confeti/design-system';

import { useLikeMutation } from '@shared/hooks/queries/use-like-mutation';
import { MyArtists } from '@shared/types/user-response';
import { getAddedDate } from '@shared/utils/format-date';

import * as styles from './artist-list.css';

interface Props {
  artists: MyArtists[];
}

const ArtistList = ({ artists }: Props) => {
  const { mutate } = useLikeMutation();

  const handleLike = (artistId: string, action: 'LIKE' | 'UNLIKE') => {
    mutate({ id: artistId, action, type: 'ARTIST' });
  };

  return (
    <ul>
      {artists.map((artist) => (
        <li key={artist.artistId} className={styles.wrapper}>
          <div className={styles.artistInfo}>
            <Avatar size="sm" src={artist.profileUrl} alt={artist.name} />
            <div className={styles.info}>
              <p className={styles.title}>{artist.name}</p>
              <p className={styles.date}>{getAddedDate(artist.createdAt)}</p>
            </div>
          </div>

          <LikeButton
            className={styles.likeButton}
            isFavorite={artist.isFavorite}
            onLikeToggle={(action) => handleLike(artist.artistId, action)}
            isLoggedIn={!!getAccessToken()}
          />
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
