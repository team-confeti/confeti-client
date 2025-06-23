import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { SwitchCase } from '@shared/components/switch-case';

import EmptyFestivalSection from '@pages/timetable/page/empty/empty-festival-section';
import TimetableContent from '@pages/timetable/page/timetable-content/timetable-content';

import TimetableOnboard from './onboading/timetable-onboard-page';

const TimeTablePage = () => {
  const { data: festivalsData } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.AVAILABLE_FESTIVALS(),
  );
  const { data: timeTableHistory } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ONBOARDING(),
  );

  const timetableState = useMemo<'onboard' | 'empty' | 'render'>(() => {
    if (!timeTableHistory.hasTimetableHistory) return 'onboard';
    if (festivalsData.festivals.length === 0) return 'empty';
    if (festivalsData.festivals.length > 0) return 'render';
    return 'empty';
  }, [timeTableHistory.hasTimetableHistory, festivalsData.festivals]);

  return (
    <SwitchCase
      value={timetableState}
      caseBy={{
        onboard: () => <TimetableOnboard />,
        empty: () => <EmptyFestivalSection />,
        render: () => <TimetableContent festivals={festivalsData.festivals} />,
      }}
    />
  );
};

export default TimeTablePage;
