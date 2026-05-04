import { Suspense, useMemo, useState } from 'react';

import { toast } from '@confeti/design-system';

import { AppSafeArea } from '@shared/components';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '@pages/timetable/components/calender/calender';
import { TimetableHeader } from '@pages/timetable/components/header/timetable-header';
import TimetableActions from '@pages/timetable/components/timetable-actions/timetable-actions';
import TimetableBoardSection, {
  TimetableBoardSkeleton,
} from '@pages/timetable/components/timetable-board/timetable-board-section';
import { useFestivalSelect } from '@pages/timetable/hooks/use-festival-select';
import { useImageDownload } from '@pages/timetable/hooks/use-image-download';
import { useTimeBlockToggle } from '@pages/timetable/hooks/use-time-block-toggle';
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

  const timeBlock = useTimeBlockToggle({
    timetableId: selectedFestivalInfo.festivalId,
    festivalDateId: selectedDateId ?? 0,
  });

  const { dayNumber, festivalDate } = useMemo(() => {
    const dates = selectedFestivalInfo.festivalDates ?? [];
    const idx = dates.findIndex((d) => d.festivalDateId === selectedDateId);
    return {
      dayNumber: idx + 1,
      festivalDate: idx >= 0 ? formatFestivalDate(dates[idx].festivalAt) : '',
    };
  }, [selectedFestivalInfo.festivalDates, selectedDateId]);

  const { downloadImage, CaptureElement } = useImageDownload({
    fileName: `${selectedFestivalInfo.title}_day${dayNumber}`,
    boardData,
    posterUrl: selectedFestivalInfo.logoUrl,
    festivalTitle: selectedFestivalInfo.title,
    festivalDate,
    dayNumber,
  });

  const handleToggleEditMode = () => {
    if (isEditTimetableMode) {
      if (timeBlock.hasPendingChanges && boardData) {
        timeBlock.saveChanges(boardData).catch(() => {
          timeBlock.resetChanges();
          toast({
            text: '저장에 실패했어요. 다시 시도해 주세요.',
            position: 'middleCenter',
          });
        });
      }
    } else {
      timeBlock.resetChanges();
    }
    toggleEditTimetableMode();
  };

  if (!selectedDateId) return null;

  return (
    <AppSafeArea subtract="5rem" insets="none" className={styles.wrapper}>
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
            timetableId={selectedFestivalInfo.festivalId}
            selectedDateId={selectedDateId}
            isEditMode={isEditTimetableMode}
            onToggleBlock={timeBlock.toggleBlock}
            getIsSelected={timeBlock.getIsSelected}
            onDataLoaded={setBoardData}
          />
        </Suspense>
      </div>

      <TimetableActions
        isEditMode={isEditTimetableMode}
        onToggleEditMode={handleToggleEditMode}
        onDownload={downloadImage}
      />

      {CaptureElement}
    </AppSafeArea>
  );
};

export default TimetableContent;
