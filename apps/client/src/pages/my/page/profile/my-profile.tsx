import { useSuspenseQuery } from '@tanstack/react-query';
import { Header, Footer, Spacing } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { useUserProfile } from '@pages/my/hooks/use-user-info';
import Box from '@pages/my/components/profile/box';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/confeti/no-confeti-section';
import ArtistSection from '@pages/my/components/artist/artist-section';
import UserInfo from '@pages/my/components/profile/user-info';
import ConfetiSection from '@pages/my/components/confeti/confeti-section';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { useMyArtist } from '@pages/my/hooks/use-my-artist';

const MyProfile = () => {
  const profileData = useUserProfile();
  const { data: artistData } = useMyArtist();

  const { data: performanceData } = useSuspenseQuery(
    USER_QUERY_OPTIONS.FAVORITE_PERFORMANCES(),
  );

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
        showMore={artistData.artists.length > 0}
      >
        {artistData.artists.length > 0 ? (
          <ArtistSection />
        ) : (
          <NoArtistSection />
        )}
      </Box>
      <Spacing />
      <Box
        title="My Confeti"
        path={routePath.MY_CONFETI}
        showMore={performanceData.performances.length > 0}
      >
        {performanceData.performances.length > 0 ? (
          <ConfetiSection performances={performanceData.performances} />
        ) : (
          <NoConfetiSection />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyProfile;
