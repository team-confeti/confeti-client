import { useMemo } from 'react';
import { useFestivalSelect } from '@pages/time-table/hooks/use-festival-select';
import EmptyFestivalSection from '@pages/time-table/page/empty/empty-festival-section';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/time-table/festival-timetable-queries';
import { SwitchCase } from '@shared/components/switch-case';

import TimeTableLoaded from './loaded/time-table-loaded';
import TimeTableOnboard from './onboading/time-table-onboard-page';

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
        onboard: () => <TimeTableOnboard />,
        empty: () => <EmptyFestivalSection />,
        render: () => (
          <TimeTableLoaded
            festivals={festivalsData.festivals}
            boardData={boardData}
          />
        ),
      }}
    />
  );
};

export default TimeTablePage;
