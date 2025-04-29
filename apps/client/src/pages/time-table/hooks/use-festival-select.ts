import { useEffect, useState } from 'react';

import { FestivalTimetable } from '@shared/types/festival-timetable-response';

// 커스텀 훅: festivals 관련 상태 관리
export const useFestivalSelect = (festivals: FestivalTimetable[]) => {
  // 초기값을 festivals의 첫 번째 항목으로 설정
  const initialFestivalId =
    festivals.length > 0 ? festivals[0].festivalId : undefined;
  const initialDateId =
    festivals.length > 0 ? festivals[0].festivalDates[0].festivalDateId : 1;

  const [selectedFestivalId, setSelectedFestivalId] = useState<
    number | undefined
  >(initialFestivalId);
  const [selectedDateId, setSelectedDateId] = useState<number>(initialDateId);

  // festivals가 변경되면 자동으로 첫 번째 항목 선택
  useEffect(() => {
    if (festivals && festivals.length > 0) {
      setSelectedFestivalId(festivals[0].festivalId);
      setSelectedDateId(festivals[0].festivalDates[0].festivalDateId);
    }
  }, [festivals]);

  // 현재 선택된 festival 정보
  const selectedFestivalInfo: FestivalTimetable =
    festivals.find((festival) => festival.festivalId === selectedFestivalId) ||
    festivals[0] ||
    ({} as FestivalTimetable);

  const handleSelectFestival = (id: number): void => {
    const selectedFestival = festivals.find(
      (festival) => festival.festivalId === id,
    );
    if (selectedFestival) {
      setSelectedFestivalId(id);
      setSelectedDateId(selectedFestival.festivalDates[0].festivalDateId);
    }
  };

  const handleSelectDate = (dateId: number): void => {
    setSelectedDateId(dateId);
  };

  return {
    selectedFestivalInfo,
    selectedFestivalId,
    selectedDateId,
    handleSelectFestival,
    handleSelectDate,
  };
};
