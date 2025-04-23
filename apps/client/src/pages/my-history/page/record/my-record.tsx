import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@pages/my/hooks/use-user-info';
import PreviewSection from '@pages/my-history/components/preview/preview-section';
import RecordInfo from '@pages/my-history/components/record/record-info';
import RecordIntroduce from '@pages/my-history/components/record/record-introduce';
import { useMyTimeTablePreview } from '@pages/my-history/hooks/use-my-history';

import { Footer, Spacing } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';

const MyRecord = () => {
  const { data: profileData } = useUserProfile();
  const { data: timetablePreviewData } = useMyTimeTablePreview();

  if (!profileData || !timetablePreviewData) {
    return null;
  }

  const RecordCount = {
    totalPerformance: 5,
    totalTimeTable: 4,
    totalSetList: 3,
  };

  return (
    <div>
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
        previewData={timetablePreviewData.timetables.slice(0, 3)}
        emptyMessage="아직 My 타임테이블이 없어요."
        ctaText="타임테이블 추가하기"
        navigatePath={routePath.MY_HISTORY_OVERVIEW}
      />
      <Spacing size="lg" color="white" />

      <PreviewSection
        previewType="SET_LIST"
        title="My 셋리스트"
        // performances={timetablePreviewData.timetables}
        emptyMessage="아직 My 셋리스트가 없어요."
        ctaText="셋리스트 추가하기"
      />
      <Spacing size="xl" color="white" />

      <Footer />
    </div>
  );
};

export default MyRecord;
