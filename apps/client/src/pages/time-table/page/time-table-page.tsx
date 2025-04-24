import { useState } from 'react';
import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import FestivalSelector from '@pages/time-table/components/festival-selector/festival-selector';
import FestivalStage from '@pages/time-table/components/festival-stage/festival-stage';
import TimeTableActions from '@pages/time-table/components/time-table-actions/time-table-actions';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import { useImageDownload } from '@pages/time-table/hooks/use-image-download';
import { useTimeTableEdit } from '@pages/time-table/hooks/use-time-table-edit';

import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import Calender from '../components/calender/calender';
import {
  useFestivalButtonData,
  useFestivalTimetableData,
} from '../hooks/use-festival-data';

import * as styles from './time-table-page.css';
const mockData = {
  data: {
    ticketOpenAt: '2025-11-08T10:00:00',
    stageCount: 4,
    stages: [
      {
        stageOrder: 1,
        stageName: 'MAY FOREST STAGE',
        festivalTimes: [
          {
            userTimetableId: 1,
            startAt: '2025-11-08T12:00:00',
            endAt: '2025-11-08T12:40:00',
            isSelected: true,
            artists: [
              {
                artistId: 'artist_001',
                artistName: '음악대장',
              },
              {
                artistId: 'artist_002',
                artistName: '사운드웨이브',
              },
            ],
          },
          {
            userTimetableId: 2,
            startAt: '2025-11-08T13:00:00',
            endAt: '2025-11-08T13:50:00',
            isSelected: false,
            artists: [
              {
                artistId: 'artist_003',
                artistName: '메이플라워',
              },
            ],
          },
          {
            userTimetableId: 3,
            startAt: '2025-11-08T14:10:00',
            endAt: '2025-11-08T15:00:00',
            isSelected: true,
            artists: [
              {
                artistId: 'artist_004',
                artistName: '블루문',
              },
              {
                artistId: 'artist_005',
                artistName: '선셋밴드',
              },
            ],
          },
        ],
      },
      {
        stageOrder: 2,
        stageName: 'OCEAN BREEZE STAGE',
        festivalTimes: [
          {
            userTimetableId: 4,
            startAt: '2025-11-08T12:30:00',
            endAt: '2025-11-08T13:10:00',
            isSelected: false,
            artists: [
              {
                artistId: 'artist_006',
                artistName: '웨이브메이커',
              },
            ],
          },
          {
            userTimetableId: 5,
            startAt: '2025-11-08T13:30:00',
            endAt: '2025-11-08T14:20:00',
            isSelected: true,
            artists: [
              {
                artistId: 'artist_007',
                artistName: '코스모스',
              },
              {
                artistId: 'artist_008',
                artistName: '스타더스트',
              },
            ],
          },
          {
            userTimetableId: 6,
            startAt: '2025-11-08T14:40:00',
            endAt: '2025-11-08T15:30:00',
            isSelected: false,
            artists: [
              {
                artistId: 'artist_009',
                artistName: '댄스머신',
              },
            ],
          },
        ],
      },
      {
        stageOrder: 3,
        stageName: 'SUNSET BEACH STAGE',
        festivalTimes: [
          {
            userTimetableId: 7,
            startAt: '2025-11-08T12:10:00',
            endAt: '2025-11-08T12:50:00',
            isSelected: true,
            artists: [
              {
                artistId: 'artist_010',
                artistName: '썸머타임',
              },
            ],
          },
          {
            userTimetableId: 8,
            startAt: '2025-11-08T13:10:00',
            endAt: '2025-11-08T13:50:00',
            isSelected: false,
            artists: [
              {
                artistId: 'artist_011',
                artistName: '비치보이즈',
              },
              {
                artistId: 'artist_012',
                artistName: '산들바람',
              },
            ],
          },
          {
            userTimetableId: 9,
            startAt: '2025-11-08T14:10:00',
            endAt: '2025-11-08T15:10:00',
            isSelected: true,
            artists: [
              {
                artistId: 'artist_013',
                artistName: '트로피컬웨이브',
              },
            ],
          },
        ],
      },
      {
        stageOrder: 4,
        stageName: 'NIGHT SKY STAGE',
        festivalTimes: [
          {
            userTimetableId: 10,
            startAt: '2025-11-08T12:20:00',
            endAt: '2025-11-08T13:00:00',
            isSelected: false,
            artists: [
              {
                artistId: 'artist_014',
                artistName: '별빛소리',
              },
              {
                artistId: 'artist_015',
                artistName: '문라이트',
              },
            ],
          },
          {
            userTimetableId: 11,
            startAt: '2025-11-08T13:20:00',
            endAt: '2025-11-08T14:10:00',
            isSelected: true,
            artists: [
              {
                artistId: 'artist_016',
                artistName: '디제이나이트',
              },
            ],
          },
          {
            userTimetableId: 12,
            startAt: '2025-11-08T14:30:00',
            endAt: '2025-11-08T15:20:00',
            isSelected: false,
            artists: [
              {
                artistId: 'artist_017',
                artistName: '미드나이트드림',
              },
              {
                artistId: 'artist_018',
                artistName: '스타더스트',
              },
            ],
          },
        ],
      },
    ],
  },
};

const TimeTablePage = () => {
  const { isEditTimeTableMode, toggleEditTimeTableMode } = useTimeTableEdit();

  const { festivals } = useFestivalButtonData();
  const [selectedFestivalInfo, setSelectedFestivalInfo] =
    useState<FestivalTimetable>(festivals[0]);
  const [selectedDateId, setSelectedDateId] = useState<number>(1);

  const handleSelectFestival = (id: number) => {
    const selectedFestival = festivals.find(
      (festival) => festival.festivalId === id,
    );

    if (selectedFestival) {
      setSelectedFestivalInfo(selectedFestival);
      setSelectedDateId(selectedFestival.festivalDates[0].festivalDateId);
    }
  };

  const handleSelectDate = (dateId: number) => {
    setSelectedDateId(dateId);
  };

  const { data: boardData } = useFestivalTimetableData(selectedDateId);

  const { elementRef, downloadImage } = useImageDownload<HTMLDivElement>({
    fileName: `${selectedFestivalInfo.title}`,
  });

  return (
    <>
      {festivals.length === 0 ? (
        <EmptyFestivalSection />
      ) : (
        <div className={styles.wrapper}>
          <FestivalSelector
            festivals={festivals}
            selectedFestivalId={selectedFestivalInfo.festivalId}
            handleSelectFestival={handleSelectFestival}
          />
          <Calender
            festivalDates={selectedFestivalInfo.festivalDates}
            onDateSelect={handleSelectDate}
          />

          {mockData.data && (
            <div className={styles.timeTableWrapper}>
              <FestivalStage timeTableInfo={mockData.data} />
              <TimeTableBoard
                timeTableInfo={mockData.data}
                isEditMode={isEditTimeTableMode}
                ref={elementRef}
              />
            </div>
          )}

          <TimeTableActions
            isEditMode={isEditTimeTableMode}
            onToggleEditMode={toggleEditTimeTableMode}
            onDownload={downloadImage}
          />
        </div>
      )}
    </>
  );
};

export default TimeTablePage;
