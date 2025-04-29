import { useUserProfile } from '@pages/my/hooks/use-user-info';
import PreviewSection from '@pages/my-history/components/preview/preview-section';
import RecordInfo from '@pages/my-history/components/record/record-info';
import RecordIntroduce from '@pages/my-history/components/record/record-introduce';
import {
  useMyHistoryRecord,
  useMySetListPreview,
  useMyTimeTablePreview,
} from '@pages/my-history/hooks/use-my-history';

import { Footer, Spacing } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';

import * as styles from './my-record.css';

const MyRecord = () => {
  const { data: profileData } = useUserProfile();
  const { data: timetablePreviewData } = useMyTimeTablePreview();
  const { data: setListPreviewData } = useMySetListPreview();
  const { data: RecordCountData } = useMyHistoryRecord();

  if (!profileData) {
    return null;
  }

  return (
    <div className={styles.myRecordContainer}>
      <RecordIntroduce
        name={profileData.name}
        profileUrl={profileData.profileUrl}
      />
      <RecordInfo
        totalPerformance={RecordCountData.totalCount}
        totalTimeTable={RecordCountData.timetableCount}
        totalSetList={RecordCountData.setlistCount}
      />

      <PreviewSection
        previewType="TIME_TABLE"
        title="My 타임테이블"
        previewData={timetablePreviewData.timetables.slice(0, 3)}
        emptyMessage="아직 My 타임테이블이 없어요."
        ctaText="타임테이블 추가하기"
        navigatePath={`${routePath.MY_HISTORY_OVERVIEW}?type=TIME_TABLE`}
      />
      <Spacing size="lg" color="white" />

      <PreviewSection
        previewType="SET_LIST"
        title="My 셋리스트"
        previewData={setListPreviewData}
        emptyMessage="아직 My 셋리스트가 없어요."
        ctaText="셋리스트 추가하기"
        navigatePath={`${routePath.MY_HISTORY_OVERVIEW}?type=SET_LIST`}
      />
      <Spacing size="xl" color="white" />
      <Footer />
    </div>
  );
};

export default MyRecord;
