import ArtistInfo from '../components/artist-info';
import Title from '../components/title';
import * as styles from './artist-section.css';

interface ArtistSectionProps {
  artists: {
    artistId: string;
    name: string;
    profileUrl: string;
    latestReleaseAt: string;
    isFavorite: boolean;
  }[];
}

const ArtistSection = ({ artists }: ArtistSectionProps) => {
  return (
    <div className={styles.section}>
      <Title text="아티스트" />
      {artists.map((artist) => (
        <ArtistInfo
          key={artist.artistId}
          id={artist.artistId}
          image={artist.profileUrl}
          name={artist.name}
          releaseDate={artist.latestReleaseAt}
          isFavorite={artist.isFavorite}
        />
      ))}
    </div>
  );
};

export default ArtistSection;
