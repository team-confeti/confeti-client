import { Avatar } from '@confeti/design-system';

import { ConcertArtist } from '@shared/types/concert-response';

import ArtistSectionTitle from './artist-section-title';

import * as styles from './concert-artist-section.css';

interface ConcertArtistSectionProps {
  artists: ConcertArtist[];
}

const ConcertArtistSection = ({ artists }: ConcertArtistSectionProps) => {
  return (
    <section className={styles.concertArtistContainer}>
      <div className={styles.artistContent({ variants: 'title' })}>
        <ArtistSectionTitle />
        <div className={styles.artistGridContainer}>
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
