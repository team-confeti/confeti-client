import { Suspense, useMemo, useState } from 'react';

import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '@pages/timetable/components/calender/calender';
import { TimetableHeader } from '@pages/timetable/components/header/timetable-header';
import TimetableActions from '@pages/timetable/components/timetable-actions/timetable-actions';
import TimetableBoardSection, {
  TimetableBoardSkeleton,
} from '@pages/timetable/components/timetable-board/timetable-board-section';
import { useFestivalSelect } from '@pages/timetable/hooks/use-festival-select';
import { useImageDownload } from '@pages/timetable/hooks/use-image-download';
import { useTimetableEdit } from '@pages/timetable/hooks/use-timetable-edit';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';

import * as styles from './timetable-content.css';

const DAY_OF_WEEK_KR = ['일', '월', '화', '수', '목', '금', '토'] as const;

function formatFestivalDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dow = DAY_OF_WEEK_KR[date.getDay()];
  return `${month}월 ${day}일 ${dow}요일`;
}

interface TimetableContentProps {
  festivals: FestivalTimetable[];
}

const TimetableContent = ({ festivals }: TimetableContentProps) => {
  const { selectedFestivalInfo, selectedDateId, handleSelectDate } =
    useFestivalSelect(festivals);
  const { isEditTimetableMode, toggleEditTimetableMode } = useTimetableEdit();
  const [boardData, setBoardData] = useState<TimetableInfo | null>(null);

  const { dayNumber, festivalDate } = useMemo(() => {
    const dates = selectedFestivalInfo.festivalDates ?? [];
    const idx = dates.findIndex((d) => d.festivalDateId === selectedDateId);
    return {
      dayNumber: idx + 1,
      festivalDate: idx >= 0 ? formatFestivalDate(dates[idx].festivalAt) : '',
    };
  }, [selectedFestivalInfo.festivalDates, selectedDateId]);

  const { downloadImage, CaptureElement } = useImageDownload({
    fileName: selectedFestivalInfo.title,
    boardData,
    posterUrl: selectedFestivalInfo.logoUrl,
    festivalTitle: selectedFestivalInfo.title,
    festivalDate,
    dayNumber,
  });

  if (!selectedDateId) return null;

  return (
    <div className={styles.wrapper}>
      <TimetableHeader title={selectedFestivalInfo.title} />
      <Calender
        festivalDates={selectedFestivalInfo.festivalDates}
        selectedDateId={selectedDateId}
        onDateSelect={handleSelectDate}
        posterUrl={selectedFestivalInfo.logoUrl}
        isEditMode={isEditTimetableMode}
      />

      <div className={styles.timeTableWrapper}>
        <Suspense key={selectedDateId} fallback={<TimetableBoardSkeleton />}>
          <TimetableBoardSection
            selectedDateId={selectedDateId}
            isEditMode={isEditTimetableMode}
            onDataLoaded={setBoardData}
          />
        </Suspense>
      </div>

      <TimetableActions
        isEditMode={isEditTimetableMode}
        onToggleEditMode={toggleEditTimetableMode}
        onDownload={downloadImage}
      />

      {CaptureElement}
    </div>
  );
};

export default TimetableContent;
