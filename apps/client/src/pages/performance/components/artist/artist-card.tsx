import { IcArtistNon } from '@confeti/design-system/icons';

import { ArtistGridProps } from '../../types/artist';
import { ConcertArtist } from '../../types/concert';
import * as styles from './artist-card.css';

interface ArtistCardProps {
  artist: ConcertArtist;
  dayId?: number;
  type: ArtistGridProps['type'];
}

const ArtistCard = ({ artist, dayId, type }: ArtistCardProps) => {
  const key = dayId
    ? `${type}-${dayId}-${artist.artistId}`
    : `${type}-concert-${artist.artistId}`;

  return (
    <div key={key} className={styles.artist}>
      <div className={styles.artistImageContainer}>
        {artist.profileUrl ? (
          <img
            src={artist.profileUrl}
            alt={artist.name}
            className={styles.artistImage}
          />
        ) : (
          <IcArtistNon width="100%" height="100%" />
        )}
      </div>
      <p className={styles.artistName}>{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
