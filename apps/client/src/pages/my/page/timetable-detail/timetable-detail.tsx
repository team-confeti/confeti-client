import { Suspense, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';

import Calender from '@pages/timetable/components/calender/calender';
import { TimetableHeader } from '@pages/timetable/components/header/timetable-header';
import TimetableBoardSection, {
  TimetableBoardSkeleton,
} from '@pages/timetable/components/timetable-board/timetable-board-section';

import * as styles from './timetable-detail.css';

const TimetableDetail = () => {
  const { id } = useParams<{ id: string }>();
  const timetableFestivalId = Number(id);

  const { data: datesData } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.TIMETABLE_DATES(timetableFestivalId),
  );

  const [selectedDateId, setSelectedDateId] = useState<number>(
    datesData.dates[0]?.festivalDateId,
  );

  const handleSelectDate = (dateId: number) => {
    setSelectedDateId(dateId);
  };

  if (!selectedDateId) return null;

  return (
    <div className={styles.wrapper}>
      <TimetableHeader title={datesData.title} />

      <Calender
        festivalDates={datesData.dates}
        selectedDateId={selectedDateId}
        onDateSelect={handleSelectDate}
        posterUrl={datesData.posterUrl}
      />

      <div className={styles.timeTableWrapper}>
        <Suspense key={selectedDateId} fallback={<TimetableBoardSkeleton />}>
          <TimetableBoardSection selectedDateId={selectedDateId} />
        </Suspense>
      </div>
    </div>
  );
};

export default TimetableDetail;
