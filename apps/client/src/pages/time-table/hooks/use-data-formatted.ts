import { useEffect, useMemo, useState } from 'react';

import { WEEKDAYS } from '@shared/constants/day';

const YEAR_MESSAGE = {
  ERR_MESSAGE: '',
};

const weekData = WEEKDAYS;

export const useFormattedYear = (date: string | null) => {
  if (!date) {
    return ``;
  }

  const [year, month] = date.split('.') || [];
  if (!year || !month) {
    return `${YEAR_MESSAGE.ERR_MESSAGE}`;
  }

  return `${year}년 ${parseInt(month, 10)}월`;
};

/**
 * 특정 날짜 기준으로 일주일 동안의 날짜(num) 값을 계산하고 반환함
 */
export const useFormattedWeek = (date: string | null) => {
  return useMemo(() => {
    if (!date) return { weekDays: [] };

    const [year, month, day] = date
      .split('.')
      .map((part) => parseInt(part, 10));
    if (isNaN(year) || isNaN(month) || isNaN(day)) return { weekDays: [] };

    const baseDate = new Date(year, month - 1, day);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      return {
        date: currentDate.getDate(),
        dayKo: weekData[currentDate.getDay()],
      };
    });

    return { weekDays };
  }, [date]);
};

export const useDayNumSelection = (
  festivalDates: { festivalDateId: number; festivalAt: string }[],
) => {
  const [selectedDayNumId, setSelectedDateId] = useState<number | null>(null);

  useEffect(() => {
    if (festivalDates && festivalDates.length > 0) {
      setSelectedDateId(festivalDates[0].festivalDateId);
    }
  }, [festivalDates]);

  const handleDayNumClick = (festivalDateId: number) => {
    setSelectedDateId((prev) =>
      prev === festivalDateId ? null : festivalDateId,
    );
  };

  return {
    selectedDayNumId,
    handleDayNumClick,
    setSelectedDateId,
  };
};

// festivalDateMap 생성 함수
export const createFestivalDateMap = (
  festivalDates: { festivalDateId: number }[],
) => {
  return new Map(
    festivalDates.map((festival, festivalDateId) => [
      festivalDateId + 1,
      festival.festivalDateId,
    ]),
  );
};

// isSelected 처리 함수
export const checkFestivalDateStatus = (
  festivalDateMap: Map<number, number>,
  id: number,
  selectedDateId: number | null,
) => {
  const festivalDateId = festivalDateMap.get(id + 1);
  const isSelected: boolean | undefined =
    festivalDateId && selectedDateId === festivalDateId ? true : undefined;
  const hasFestivalDate = festivalDateId !== undefined;

  return { festivalDateId, isSelected, hasFestivalDate };
};
