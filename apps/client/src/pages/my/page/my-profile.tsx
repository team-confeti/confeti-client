import { Header, Footer, Spacing } from '@confeti/design-system';
import { USER_DATA } from '@shared/mocks/user-data';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';

import UserInfo from '../components/user-info';
import Box from '../components/box';
import NoArtistSection from '../components/no-artist-section';
import NoConfetiSection from '../components/no-confeti-section';
import ArtistSection from '../components/artist-section';
import ConfetiSection from '../components/conteti-section';
import { routePath } from '@shared/constants/path';

const MyProfile = () => {
  const { userName, profileUrl } = USER_DATA.data;
  const artists = [...ARTISTS_DATA.data.artists];
  const confetis = [...PERFORMANCE_DATA.data.performances.slice(0, 3)]; // 임의로 앞에 3개만 가져옴

  return (
    <>
      <Header variant="detail" title="마이페이지" />
      <UserInfo userName={userName} profileUrl={profileUrl} />
      <Spacing />
      <Box
        title="My Artist"
        path={routePath.MY_ARTIST}
        showMore={artists.length > 0}
      >
        {artists.length > 0 ? (
          <ArtistSection artists={artists} />
        ) : (
          <NoArtistSection />
        )}
      </Box>
      <Spacing />
      <Box
        title="My Confeti"
        path={routePath.MY_CONFETI}
        showMore={confetis.length > 0}
      >
        {confetis.length > 0 ? (
          <ConfetiSection confeti={confetis} />
        ) : (
          <NoConfetiSection />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyProfile;
