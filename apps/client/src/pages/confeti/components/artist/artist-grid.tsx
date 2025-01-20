import { ArtistGridProps } from '../../types/artist.ts';
import ArtistCard from './artist-card';
import * as styles from './artist-grid.css.ts';

const ArtistGrid = ({ artists, dayId, type }: ArtistGridProps) => (
  <div className={styles.grid}>
    {artists.map((artist, index) => (
      <ArtistCard
        key={`${dayId ?? 'concert'}-${artist.artistId}-${index}`}
        artist={artist}
        dayId={dayId}
        type={type}
      />
    ))}
  </div>
);

export default ArtistGrid;
