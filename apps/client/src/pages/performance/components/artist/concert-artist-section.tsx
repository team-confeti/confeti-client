import { PERFORMANCE_LABEL } from '@pages/performance/constant/performance';

import { Avatar } from '@confeti/design-system';
import { ConcertArtist } from '@shared/types/concert-response';

import * as styles from './artist-section.css';

interface ArtistSectionProps {
  artists: ConcertArtist[];
}

const ConcertArtistSection = ({ artists }: ArtistSectionProps) => {
  return (
    <section className={styles.concertArtistContainer}>
      <div className={styles.artistContent({ variants: 'title' })}>
        <h2 className={styles.ArtistTitle}>{PERFORMANCE_LABEL.ARTIST}</h2>
        <div className={styles.artistListContainer}>
          {artists.map((artist) => (
            <div key={artist.artistId} className={styles.artistItem}>
              <Avatar
                isHandleClick={false}
                size="lg"
                src={artist.profileUrl}
                alt={`${artist.name} 이미지`}
              />
              <p className={styles.artistName}>{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConcertArtistSection;
