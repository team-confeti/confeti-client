import { useSuspenseQuery } from '@tanstack/react-query';
import { Header, Footer, Spacing } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';

import { useUserProfile } from '@pages/my/hooks/use-user-info';
import Box from '@pages/my/components/profile/box';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/confeti/no-confeti-section';
import ArtistSection from '@pages/my/components/artist/artist-section';
import UserInfo from '@pages/my/components/profile/user-info';
import ConfetiSection from '@pages/my/components/confeti/confeti-section';

const MyProfile = () => {
  const profileData = useUserProfile();
  const artists = [...ARTISTS_DATA.data.artists];

  const { data } = useSuspenseQuery(USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES());

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
        {artists.length > 0 ? <ArtistSection /> : <NoArtistSection />}
      </Box>
      <Spacing />
      <Box
        title="My Confeti"
        path={routePath.MY_CONFETI}
        showMore={data.performances.length > 0}
      >
        {data.performances.length > 0 ? (
          <ConfetiSection performances={data.performances} />
        ) : (
          <NoConfetiSection />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyProfile;
