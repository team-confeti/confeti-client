import { Suspense } from 'react';

import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '@pages/timetable/components/calender/calender';
import FestivalSelector from '@pages/timetable/components/festival-selector/festival-selector';
import { TimetableHeader } from '@pages/timetable/components/header/timetable-header';
import TimetableActions from '@pages/timetable/components/timetable-actions/timetable-actions';
import TimetableBoardSection, {
  TimetableBoardSkeleton,
} from '@pages/timetable/components/timetable-board/timetable-board-section';
import { useFestivalSelect } from '@pages/timetable/hooks/use-festival-select';
import { useImageDownload } from '@pages/timetable/hooks/use-image-download';
import { useTimetableEdit } from '@pages/timetable/hooks/use-timetable-edit';

import * as styles from './timetable-content.css';

interface TimetableContentProps {
  festivals: FestivalTimetable[];
}

const TimetableContent = ({ festivals }: TimetableContentProps) => {
  const {
    selectedFestivalInfo,
    selectedDateId,
    handleSelectFestival,
    handleSelectDate,
  } = useFestivalSelect(festivals);
  const { isEditTimetableMode, toggleEditTimetableMode } = useTimetableEdit();

  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${selectedFestivalInfo.title}`,
  });

  if (!selectedDateId) return null;

  return (
    <div className={styles.wrapper}>
      <TimetableHeader title={selectedFestivalInfo.title} />
      {/* TODO: 랜딩페이지 추가되면 FestivalSelector 삭제 */}
      <FestivalSelector
        festivals={festivals}
        selectedFestivalId={selectedFestivalInfo.festivalId}
        handleSelectFestival={handleSelectFestival}
      />
      <Calender
        festivalDates={selectedFestivalInfo.festivalDates}
        selectedDateId={selectedDateId}
        onDateSelect={handleSelectDate}
        posterUrl={selectedFestivalInfo.logoUrl}
      />

      <div className={styles.timeTableWrapper}>
        <Suspense key={selectedDateId} fallback={<TimetableBoardSkeleton />}>
          <TimetableBoardSection
            selectedDateId={selectedDateId}
            isEditMode={isEditTimetableMode}
            elementRef={elementRef}
          />
        </Suspense>
      </div>

      <TimetableActions
        isEditMode={isEditTimetableMode}
        onToggleEditMode={toggleEditTimetableMode}
        onDownload={downloadImage}
      />
    </div>
  );
};

export default TimetableContent;
