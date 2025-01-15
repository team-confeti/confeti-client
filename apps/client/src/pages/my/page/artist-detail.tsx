import { ArtistCard, Header } from '@confeti/design-system';
import { ARTIST_DATA } from '@shared/mocks/artist-data';
import * as styles from './artist-detail.css';

const ArtistDetail = () => {
  return (
    <>
      <Header variant="detail" title="My Artist" />
      <div className={styles.container}>
        {ARTIST_DATA.data.artists.map((artist) => (
          <ArtistCard
            key={artist.artistId}
            artistId={artist.artistId}
            title={artist.name}
            imageSrc={artist.profileUrl}
            size={'md'}
          />
        ))}
      </div>
    </>
  );
};

export default ArtistDetail;
