import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Box, Spacing } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { DetailHeader, Footer } from '@shared/components';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';
import { routePath } from '@shared/router/path';

import ArtistSection from '@pages/my/components/artist/artist-section';
import NoArtistSection from '@pages/my/components/artist/no-artist-section';
import PerformanceSection from '@pages/my/components/performance/performance-section';
import LogoutSection from '@pages/my/components/profile/logout-section';
import UserActivitySummary from '@pages/my/components/profile/user-activity-summary';
import UserInfo from '@pages/my/components/profile/user-info';

import * as styles from '@pages/my/page/profile/my-profile.css';

const MyProfile = () => {
  const navigate = useNavigate();

  const { data: profileData } = useUserProfile();
  const { data: artistData } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_ARTISTS_PREVIEW(),
  });
  const { data: performanceData } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES_PREVIEW(),
  });

  if (!profileData) {
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
      <UserActivitySummary />
      <Spacing size="md" color="gray" />
      <Box
        title="선호하는 공연"
        onShowMore={
          performanceData.performances.length > 3
            ? () => navigate(routePath.MY_CONFETI)
            : undefined
        }
        showMoreText="더보기"
      >
        {performanceData.performances.length > 0 ? (
          <PerformanceSection
            performances={performanceData.performances.slice(0, 3)}
          />
        ) : (
          <p className={styles.noLikePerformanceText}>
            아직 선호하는 공연이 없어요.
          </p>
        )}
      </Box>
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
      <LogoutSection />
      <Footer />
    </>
  );
};

export default MyProfile;
