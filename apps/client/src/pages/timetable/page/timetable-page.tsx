import { useMemo } from 'react';
import { useFestivalSelect } from '@pages/timetable/hooks/use-festival-select';
import EmptyFestivalSection from '@pages/timetable/page/empty/empty-festival-section';
import TimetableContent from '@pages/timetable/page/timetable-content/timetable-content';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { SwitchCase } from '@shared/components/switch-case';

import TimetableOnboard from './onboading/timetable-onboard-page';

const TimeTablePage = () => {
  const { data: festivalsData } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.AVAILABLE_FESTIVALS(),
  );
  const { data: timeTableHistory } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.ONBOARDING(),
  );
  const { selectedDateId } = useFestivalSelect(festivalsData.festivals);
  const { data: boardData } = useQuery({
    ...FESTIVAL_TIMETABLE_QUERY_OPTIONS.FESTIVAL_TIMETABLE(selectedDateId ?? 0),
    enabled: selectedDateId !== undefined,
  });

  const timetableState = useMemo<'onboard' | 'empty' | 'render'>(() => {
    if (!timeTableHistory.hasTimetableHistory) return 'onboard';
    if (festivalsData.festivals.length === 0) return 'empty';
    if (festivalsData.festivals.length > 0 && boardData) return 'render';
    return 'empty';
  }, [
    timeTableHistory.hasTimetableHistory,
    festivalsData.festivals,
    boardData,
  ]);

  return (
    <SwitchCase
      value={timetableState}
      caseBy={{
        onboard: () => <TimetableOnboard />,
        empty: () => <EmptyFestivalSection />,
        render: () => (
          <TimetableContent
            festivals={festivalsData.festivals}
            boardData={boardData}
          />
        ),
      }}
    />
  );
};

export default TimeTablePage;
