import { useState, useMemo } from 'react';

interface Festival {
  festivalId: number;
  title: string;
  logoUrl: string;
  festivalDates: Array<{
    festivalDateId: number;
    festivalAt: string;
  }>;
}

export const useButtonSelection = (festivals: Festival[]) => {
  // 초기 선택된 축제 ID 설정
  const [clickedFestivalId, setClickedFestivalId] = useState<number | null>(
    festivals.length > 0 ? festivals[0].festivalId : null,
  );

  // festival ID와 dates를 매핑하는 Map 생성
  const festivalDatesMap = useMemo(
    () =>
      new Map(
        festivals.map((festival) => [
          festival.festivalId,
          festival.festivalDates,
        ]),
      ),
    [festivals],
  );

  // 축제 선택/해제 핸들러
  const handleFestivalClick = (festivalId: number) => {
    setClickedFestivalId(festivalId);
  };

  // 선택된 축제의 날짜들 가져오기
  const selectedFestivalDates = clickedFestivalId
    ? (festivalDatesMap.get(clickedFestivalId) ?? [])
    : [];

  return {
    clickedFestivalId,
    selectedFestivalDates,
    handleFestivalClick,
  };
};
