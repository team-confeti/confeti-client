import { ConcertArtist } from '../../types/concert.ts';
import { ArtistGridProps } from '../../types/artist.ts';
import * as styles from './artist-card.css.ts';
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
      <div className={styles.artistImage}>
        <img src={artist.profileUrl} alt={artist.name} />
      </div>
      <p className={styles.artistName}>{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
