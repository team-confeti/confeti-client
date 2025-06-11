import { useNavigate } from 'react-router-dom';
import ArtistSection from '@pages/my/components/artist/artist-section';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/performance/no-performance-section';
import ConfetiSection from '@pages/my/components/performance/performance-section';
import LogoutSection from '@pages/my/components/profile/logout-section';
import UserInfo from '@pages/my/components/profile/user-info';
import NoUpcomingPerformanceSection from '@pages/my/components/upcoming-performance/no-upcoming-performance-section';
import UpcomingPerformanceSection from '@pages/my/components/upcoming-performance/upcoming-performance-section';
import { useQuery } from '@tanstack/react-query';

import { Box, Footer, Header } from '@confeti/design-system';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';
import { routePath } from '@shared/router/path';
import { checkIsNotLoggedIn } from '@shared/utils/check-is-not-logged-in';

const MyProfile = () => {
  const navigate = useNavigate();
  const isNotLoggedIn = checkIsNotLoggedIn();

  const { data: profileData } = useUserProfile();
  const { data: upcomingPerformanceData } = useQuery({
    ...USER_QUERY_OPTIONS.MY_UPCOMING_PERFORMANCE(),
    enabled: !isNotLoggedIn,
  });
  const { data: artistData } = useQuery({
    ...USER_QUERY_OPTIONS.MY_ARTISTS_PREVIEW(),
    enabled: !isNotLoggedIn,
  });
  const { data: performanceData } = useQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES_PREVIEW(),
    enabled: !isNotLoggedIn,
  });

  if (!profileData || !artistData || !performanceData) {
    return null;
  }

  return (
    <>
      <Header
        variant="detail"
        title="마이페이지"
        handleNavigateToSettings={() => {
          navigate(routePath.MY_SETTING);
        }}
      />
      <UserInfo
        name={profileData.name}
        profileUrl={profileData.profileUrl}
        showArrow={true}
      />
      <Box title="다가오는 공연">
        {upcomingPerformanceData?.typeId ? (
          <UpcomingPerformanceSection performance={upcomingPerformanceData} />
        ) : (
          <NoUpcomingPerformanceSection />
        )}
      </Box>

      <Box
        title="My Artist"
        path={routePath.MY_ARTIST}
        showMore={artistData.artists.length > 3}
        showMoreText="더보기"
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
        showMoreText="더보기"
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
