import { formatDate } from '@shared/utils/format-date';
import ArtistInfo from '../components/artist-info';
import Title from '../components/title';
import * as styles from './artist-section.css';

interface ArtistSectionProps {
  artist: {
    artistId: string;
    name: string;
    profileUrl: string;
    latestReleaseAt: string;
    isFavorite: boolean;
  }[];
}

const ArtistSection = ({ artist }: ArtistSectionProps) => {
  const releaseDate = artist[0].latestReleaseAt;
  const formattedDate = formatDate(releaseDate);

  return (
    <div className={styles.section}>
      <Title text="아티스트" />
      {artist?.map((artist) => (
        <ArtistInfo
          key={artist.artistId}
          id={artist.artistId}
          image={artist.profileUrl}
          name={artist.name}
          releaseDate={formattedDate}
          isFavorite={artist.isFavorite}
        />
      ))}
    </div>
  );
};

export default ArtistSection;
