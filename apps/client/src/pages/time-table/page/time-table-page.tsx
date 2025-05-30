import { useMemo } from 'react';
import { useFestivalSelect } from '@pages/time-table/hooks/use-festival-select';
import EmptyFestivalSection from '@pages/time-table/page/empty/empty-festival-section';

import { SwitchCase } from '@shared/components/switch-case';

import {
  useFestivalButtonData,
  useFestivalTimetableData,
  useTimeTableCreationHistory,
} from '../hooks/use-festival-data';
import TimeTableLoaded from './loaded/time-table-loaded';
import TimeTableOnboard from './onboading/time-table-onboard-page';

const TimeTablePage = () => {
  const { festivals } = useFestivalButtonData();
  const { hasTimetableHistory } = useTimeTableCreationHistory();
  const { selectedDateId } = useFestivalSelect(festivals);
  const { data: boardData } = useFestivalTimetableData(selectedDateId);

  const timetableState = useMemo<'onboard' | 'empty' | 'render'>(() => {
    if (!hasTimetableHistory) return 'onboard';
    if (festivals.length === 0) return 'empty';
    if (festivals.length > 0 && boardData) return 'render';
    return 'empty';
  }, [hasTimetableHistory, festivals, boardData]);

  return (
    <SwitchCase
      value={timetableState}
      caseBy={{
        onboard: () => <TimeTableOnboard />,
        empty: () => <EmptyFestivalSection />,
        render: () => (
          <TimeTableLoaded festivals={festivals} boardData={boardData} />
        ),
      }}
    />
  );
};

export default TimeTablePage;
