import { useMyArtist } from '@pages/my/hooks/use-my-favorites';

import { ArtistCard, Header } from '@confeti/design-system';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';

import * as styles from './artist-more.css';

const ArtistMore = () => {
  const { data } = useMyArtist();

  if (!data) return null;

  const allArtists = [...data.artists, ...ARTISTS_DATA.artists];

  return (
    <>
      <Header variant="detail" title="My Artist" />
      <div className={styles.container}>
        {allArtists.map((artist) => (
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
export default ArtistMore;
