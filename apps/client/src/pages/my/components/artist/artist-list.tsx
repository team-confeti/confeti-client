import { Avatar, LikeButton } from '@confeti/design-system';
import { useLikeMutation } from '@shared/hooks/use-like-mutation';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

import * as styles from './artist-list.css';

// TODO: API 명세서 나오면 실제 타입으로 변경
interface Artist {
  artistId: string;
  name: string;
  profileUrl: string;
  addedDate?: string;
}

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList = ({ artists }: ArtistListProps) => {
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
              {/* TODO: 명세서 나오면 데이터 변경 */}
              <p className={styles.date}>{artist.addedDate || '최근 추가됨'}</p>
            </div>
          </div>

          <LikeButton
            className={styles.likeButton}
            // TODO: 좋아요 여부 API 연결 후 변경
            isFavorite={true}
            onLikeToggle={(action) => handleLike(artist.artistId, action)}
            isLoggedIn={!checkIsNotLoggedIn()}
          />
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
