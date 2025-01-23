import { ArtistCard } from '@confeti/design-system';
import * as styles from './artist-section.css';
import { Artists } from '@shared/types/user-response';

interface ArtistProps {
  artists: Artists[];
}

const ArtistSection = ({ artists }: ArtistProps) => {
  return (
    <div className={styles.container}>
      {artists.map((artist) => (
        <ArtistCard
          key={artist.artistId}
          artistId={artist.artistId}
          title={artist.name}
          imageSrc={artist.profileUrl}
          size="lg"
        />
      ))}
    </div>
  );
};

export default ArtistSection;
