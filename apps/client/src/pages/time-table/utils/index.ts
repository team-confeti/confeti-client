import {
  TIME_SLOT_HEIGHT_5_MIN,
  ONE_HOUR_TO_MINUTES,
} from '@pages/time-table/constants';

export const generateTableRow = (startTime: number) => {
  return Array.from({ length: 24 - startTime }, (_, idx) => startTime + idx);
};

export const parseTimeString = (timeString: string): number[] => {
  return timeString.slice(0, 5).split(':').map(Number);
};

export const calcPosition = (totalMin: number, minutesFromOpen: number) => {
  const top = (minutesFromOpen / 5) * TIME_SLOT_HEIGHT_5_MIN;
  const diff = (totalMin / 5) * TIME_SLOT_HEIGHT_5_MIN;
  return { top, diff };
};

export const calcTotalMinutes = (
  startHour: number,
  startMin: number,
  endHour: number,
  endMin: number,
) => {
  return endHour * 60 + endMin - (startHour * ONE_HOUR_TO_MINUTES + startMin);
};

export const calcMinutesFromOpen = (
  startHour: number,
  startMin: number,
  openHour: number,
  openMin: number,
) => {
  const startTotalMin = startHour * ONE_HOUR_TO_MINUTES + startMin;
  const openTotalMin = openHour * ONE_HOUR_TO_MINUTES + openMin;
  return startTotalMin - openTotalMin;
};
