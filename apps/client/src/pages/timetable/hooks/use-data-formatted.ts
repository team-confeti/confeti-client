import { useEffect, useMemo, useState } from 'react';

import { WEEKDAYS } from '@shared/constants/day';

const weekData = WEEKDAYS;

/**
 * 특정 날짜 기준으로 일주일 동안의 날짜(num) 값을 계산하고 반환함
 */
export const useFormattedWeek = (date: string | null) => {
  return useMemo(() => {
    if (!date) return { weekDays: [] };

    const datePart = date.split('T')[0];

    const [year, month, day] = datePart
      .split('-')
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
