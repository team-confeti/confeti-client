import { ArtistSearch } from '@shared/types/search-reponse';
import { formatDate } from '@shared/utils/format-date';

import Title from '../title';
import ArtistInfo from './artist-info';

import * as styles from './artist-section.css';

interface ArtistSectionProps {
  artist: ArtistSearch;
}

const ArtistSection = ({ artist }: ArtistSectionProps) => {
  const formattedDate = formatDate(artist.latestReleaseAt);

  return (
    <div className={styles.section}>
      <Title text="아티스트" />
      <ArtistInfo
        id={artist.artistId}
        image={artist.profileUrl}
        name={artist.name}
        releaseDate={formattedDate}
        isFavorite={artist.isFavorite}
      />
    </div>
  );
};

export default ArtistSection;
