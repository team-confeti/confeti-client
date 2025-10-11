import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getAccessToken } from '@confeti/core/auth';
import { Box } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { DetailHeader, Footer } from '@shared/components';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';
import { routePath } from '@shared/router/path';

import ArtistSection from '@pages/my/components/artist/artist-section';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import NoConfetiSection from '@pages/my/components/performance/no-performance-section';
import ConfetiSection from '@pages/my/components/performance/performance-section';
import LogoutSection from '@pages/my/components/profile/logout-section';
import UserActivitySummary from '@pages/my/components/profile/user-activity-summary';
import UserInfo from '@pages/my/components/profile/user-info';

const MyProfile = () => {
  const navigate = useNavigate();
  const isNotLoggedIn = !getAccessToken();

  const { data: profileData } = useUserProfile();
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
      <DetailHeader
        title="마이페이지"
        rightIcon={
          <button onClick={() => navigate(routePath.MY_SETTING)}>
            <Icon name="setting" size="2.4rem" />
          </button>
        }
      />
      <UserInfo name={profileData.name} profileUrl={profileData.profileUrl} />
      {/* TODO: v2 API 연동 후 수정 */}
      <UserActivitySummary
        totalPerformanceCount={3}
        TimeTableCount={3}
        setListCount={3}
      />
      <Box
        title="My Artist"
        onShowMore={
          artistData.artists.length > 3
            ? () => navigate(routePath.MY_ARTIST)
            : undefined
        }
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
        onShowMore={
          performanceData.performances.length > 3
            ? () => navigate(routePath.MY_CONFETI)
            : undefined
        }
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
