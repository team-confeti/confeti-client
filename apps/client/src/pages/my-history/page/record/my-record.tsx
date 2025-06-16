import PreviewSection from '@pages/my-history/components/preview/preview-section';
import RecordInfo from '@pages/my-history/components/record/record-info';
import RecordIntroduce from '@pages/my-history/components/record/record-introduce';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Footer, Spacing } from '@confeti/design-system';

import { MY_RECORD_QUERY_OPTION } from '@shared/apis/my-history/my-record-queries';
import { MY_SETLIST_QUERY_OPTION } from '@shared/apis/my-history/my-setlist-queries';
import { MY_TIMETABLE_QUERY_OPTION } from '@shared/apis/my-history/my-timetable-queries';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';
import { routePath } from '@shared/router/path';

import * as styles from './my-record.css';

const MyRecord = () => {
  const { data: profileData } = useUserProfile();
  const { data: timetablePreviewData } = useSuspenseQuery(
    MY_TIMETABLE_QUERY_OPTION.PREVIEW(),
  );
  const { data: setListPreviewData } = useSuspenseQuery(
    MY_SETLIST_QUERY_OPTION.PREVIEW(),
  );
  const { data: RecordCountData } = useSuspenseQuery(
    MY_RECORD_QUERY_OPTION.ALL(),
  );

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
