import { ArtistCard, Header } from '@confeti/design-system';
import { useMyArtist } from '@pages/my/hooks/use-my-artist';
import * as styles from './artist-detail.css';

const ArtistDetail = () => {
  const { data: artistData } = useMyArtist();

  return (
    <>
      <Header variant="detail" title="My Artist" />
      <div className={styles.container}>
        {artistData?.artists.map((artist) => (
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
