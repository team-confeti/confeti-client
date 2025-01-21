import { ArtistCard, Header } from '@confeti/design-system';
import { useMyArtistQuery } from '@pages/my/hooks/use-my-artist-query';
import * as styles from './artist-detail.css';

const ArtistDetail = () => {
  const { data: artistData } = useMyArtistQuery();

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
