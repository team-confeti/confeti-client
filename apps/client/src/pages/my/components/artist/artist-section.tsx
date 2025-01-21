import { ArtistCard } from '@confeti/design-system';
import * as styles from './artist-section.css';
import { useMyArtistQuery } from '@pages/my/hooks/use-my-artist-query';
type Artist = {
  artistId: string;
  name: string;
  profileUrl: string;
};

interface ArtistSectionProps {
  artists: Artist[];
}

const ArtistSection = ({ artists }: ArtistSectionProps) => {
  const { data: artistData } = useMyArtistQuery();
  return (
    <div className={styles.container}>
      {artistData?.artists.map((artist) => (
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
