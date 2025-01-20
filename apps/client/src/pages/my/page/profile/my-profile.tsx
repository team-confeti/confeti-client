import { Header, Footer, Spacing } from '@confeti/design-system';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';
import { routePath } from '@shared/constants/path';

import { useUserProfile } from '@pages/my/hooks/use-user-info';
import Box from '@pages/my/components/profile/box';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/confeti/no-confeti-section';
import ArtistSection from '@pages/my/components/artist/artist-section';
import UserInfo from '@pages/my/components/profile/user-info';
import ConfetiSection from '@pages/my/components/confeti/conteti-section';

const MyProfile = () => {
  const profileData = useUserProfile();

  // TODO API 연동 후 수정
  const artists = [...ARTISTS_DATA.data.artists];
  const confetis = [...PERFORMANCE_DATA.data.performances.slice(0, 3)]; // 임의로 앞에 3개만 가져옴

  return (
    <>
      <Header variant="detail" title="마이페이지" />
      <UserInfo
        userName={profileData.username}
        profileUrl={profileData.profileUrl}
      />
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
