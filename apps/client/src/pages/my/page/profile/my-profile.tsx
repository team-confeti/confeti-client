import ArtistSection from '@pages/my/components/artist/artist-section';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/performance/no-performance-section';
import ConfetiSection from '@pages/my/components/performance/performance-section';
import Box from '@pages/my/components/profile/box';
import LogoutSection from '@pages/my/components/profile/logout-section';
import UserInfo from '@pages/my/components/profile/user-info';
import NoUpcomingPerformanceSection from '@pages/my/components/upcomingPerformance/no-upcoming-performance-section';
import UpcomingPerformanceSection from '@pages/my/components/upcomingPerformance/upcoming-performance-section';
import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import { Footer, Header } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';
import { PERFORMANCE_DATA } from '@shared/mocks/performance-data';

const MyProfile = () => {
  const { data: profileData } = useUserProfile();

  // TODO: API 데이터 연결 (ARTISTS_DATA 제거)
  // const { data: artistData } = useMyArtist();
  const artistData = ARTISTS_DATA;
  const upcomingPerformanceData = PERFORMANCE_DATA.performances[0];
  const { data: performanceData } = useMyConfeti();

  if (!profileData || !artistData || !performanceData) {
    return null;
  }

  return (
    <>
      <Header variant="detail" title="마이페이지" />
      <UserInfo name={profileData.name} profileUrl={profileData.profileUrl} />
      <Box title="다가오는 공연">
        {upcomingPerformanceData ? (
          <UpcomingPerformanceSection performance={upcomingPerformanceData} />
        ) : (
          <NoUpcomingPerformanceSection />
        )}
      </Box>

      <Box
        title="My Artist"
        path={routePath.MY_ARTIST}
        showMore={artistData.artists.length > 3}
      >
        {artistData.artists.length > 0 ? (
          <ArtistSection artists={artistData.artists.slice(0, 3)} />
        ) : (
          <NoArtistSection />
        )}
      </Box>

      <Box
        title="My Confeti"
        path={routePath.MY_CONFETI}
        showMore={performanceData.performances.length > 3}
      >
        {performanceData.performances.length > 0 ? (
          <ConfetiSection
            performances={performanceData.performances.slice(0, 3)}
          />
        ) : (
          <NoConfetiSection />
        )}
      </Box>
      <LogoutSection />
      <Footer />
    </>
  );
};

export default MyProfile;
