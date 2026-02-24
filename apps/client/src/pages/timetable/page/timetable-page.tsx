import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { SwitchCase } from '@shared/components';

import TimetableLandingPage from './landing/timetable-landing-page';
import TimetableOnboard from './onboading/timetable-onboard-page';

const TimeTablePage = () => {
  const { data: timeTableHistory } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ONBOARDING(),
  );

  const timetableState = useMemo<'onboard' | 'landing'>(() => {
    if (!timeTableHistory.hasTimetableHistory) {
      return 'onboard';
    }
    return 'landing';
  }, [timeTableHistory.hasTimetableHistory]);

  return (
    <SwitchCase
      value={timetableState}
      caseBy={{
        onboard: () => <TimetableOnboard />,
        landing: () => <TimetableLandingPage />,
      }}
    />
  );
};

export default TimeTablePage;
