import {
  TIME_SLOT_HEIGHT_5_MIN,
  ONE_HOUR_TO_MINUTES,
} from '@pages/time-table/constants';
import { isString } from '../types/type-guards';

export const generateTableRow = (startTime: number) => {
  return Array.from({ length: 24 - startTime }, (_, idx) => startTime + idx);
};

export const parseTimeString = (timeString: string | number): string[] => {
  const time = isString(timeString)
    ? timeString.split('T')[1]?.slice(0, 5)
    : '';

  if (!time) return ['00', '00'];

  const [hour, min] = time.split(':');
  return [hour, min];
};

export const calcPosition = (totalMin: number, minutesFromOpen: number) => {
  const top = (minutesFromOpen / 5) * TIME_SLOT_HEIGHT_5_MIN;
  const diff = (totalMin / 5) * TIME_SLOT_HEIGHT_5_MIN;
  return { top, diff };
};

export const calcTotalMinutes = (
  startHour: number | string,
  startMin: number | string,
  endHour: number | string,
  endMin: number | string,
) => {
  const startHourNum = isString(startHour) ? Number(startHour) : startHour;
  const startMinNum = isString(startMin) ? Number(startMin) : startMin;
  const endHourNum = isString(endHour) ? Number(endHour) : endHour;
  const endMinNum = isString(endMin) ? Number(endMin) : endMin;

  return (
    endHourNum * 60 +
    endMinNum -
    (startHourNum * ONE_HOUR_TO_MINUTES + startMinNum)
  );
};

export const calcMinutesFromOpen = (
  startHour: number | string,
  startMin: number | string,
  openHour: number | string,
  openMin: number | string,
) => {
  const startHourNum = isString(startHour) ? Number(startHour) : startHour;
  const startMinNum = isString(startMin) ? Number(startMin) : startMin;
  const openHourNum = isString(openHour) ? Number(openHour) : openHour;
  const openMinNum = isString(openMin) ? Number(openMin) : openMin;

  const startTotalMin = startHourNum * ONE_HOUR_TO_MINUTES + startMinNum;
  const openTotalMin = openHourNum * ONE_HOUR_TO_MINUTES + openMinNum;

  return startTotalMin - openTotalMin;
};

export const calcTotalFestivalMinutes = (
  startHour: number | string,
  startMin: number | string,
) => {
  const startHourNum = isString(startHour) ? Number(startHour) : startHour;
  const startMinNum = isString(startMin) ? Number(startMin) : startMin;

  const hoursUntilEnd = 24 - startHourNum;
  const totalFestivalMinutes = hoursUntilEnd * 60 - startMinNum;

  return totalFestivalMinutes;
};
