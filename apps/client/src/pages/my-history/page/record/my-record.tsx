import { TAB_MENU } from '@pages/home/constants/menu';
import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';
import { useUserProfile } from '@pages/my/hooks/use-user-info';
import PreviewSection from '@pages/my-history/components/preview/preview-section';
import RecordInfo from '@pages/my-history/components/record/record-info';
import RecordIntroduce from '@pages/my-history/components/record/record-introduce';

import { Footer, Spacing } from '@confeti/design-system';
import NavigationTabs from '@shared/components/navigation-tabs';

const MyRecord = () => {
  const { data: profileData } = useUserProfile();

  // TODO: 실제 타임테이블 & 셋리스트 API 연결
  const { data: performanceData } = useMyConfeti();

  if (!profileData || !performanceData) {
    return null;
  }

  const RecordCount = {
    totalPerformance: 5,
    totalTimeTable: 4,
    totalSetList: 3,
  };

  return (
    <div>
      <NavigationTabs defaultActiveTab={TAB_MENU.MY_HISTORY} />

      <RecordIntroduce
        name={profileData.name}
        profileUrl={profileData.profileUrl}
      />
      <RecordInfo
        totalPerformance={RecordCount.totalPerformance}
        totalTimeTable={RecordCount.totalTimeTable}
        totalSetList={RecordCount.totalSetList}
      />

      <PreviewSection
        previewType="TIME_TABLE"
        title="My 타임테이블"
        performances={performanceData.performances.slice(0, 3)}
        emptyMessage="아직 My 타임테이블이 없어요."
        ctaText="타임테이블 추가하기"
      />
      <Spacing size="lg" color="white" />

      <PreviewSection
        previewType="SET_LIST"
        title="My 셋리스트"
        performances={performanceData.performances.slice(0, 1)}
        emptyMessage="아직 My 셋리스트가 없어요."
        ctaText="셋리스트 추가하기"
      />
      <Spacing size="xl" color="white" />

      <Footer />
    </div>
  );
};

export default MyRecord;
