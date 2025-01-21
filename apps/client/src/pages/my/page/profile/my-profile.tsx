import { Header, Footer, Spacing } from '@confeti/design-system';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';
import { routePath } from '@shared/constants/path';

import { useUserProfile } from '@pages/my/hooks/use-user-info';
import Box from '@pages/my/components/profile/box';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/confeti/no-confeti-section';
import ArtistSection from '@pages/my/components/artist/artist-section';
import UserInfo from '@pages/my/components/profile/user-info';
import ConfetiSection from '@pages/my/components/confeti/confeti-section';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/my-confeti';
import { useSuspenseQuery } from '@tanstack/react-query';

const MyProfile = () => {
  const profileData = useUserProfile();

  // TODO API 연동 후 수정
  const artists = [...ARTISTS_DATA.data.artists];

  const { data: performanceData } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.ALL(),
  );
  const confetis = performanceData?.performances.slice(0, 3); // 3개만 보여주기

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
          <ConfetiSection performances={confetis} />
        ) : (
          <NoConfetiSection />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyProfile;
