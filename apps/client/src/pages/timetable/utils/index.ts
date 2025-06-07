import {
  ONE_HOUR_TO_MINUTES,
  TIME_SLOT_HEIGHT_5_MIN,
} from '@pages/timetable/constants';

export const generateTableRow = (startTime: string) => {
  const startHour = Number(startTime);
  return Array.from({ length: 24 - startHour }, (_, idx) => startHour + idx);
};

export const parseTimeString = (timeString: string): string[] => {
  const time = timeString.split('T')[1]?.slice(0, 5);

  if (!time) return ['00', '00'];

  const [hour, min] = time.split(':');
  return [hour, min];
};

// TODO: 추후 수정 필요, 사용 안되고 있음
export const calcPosition = (totalMin: number, minutesFromOpen: number) => {
  const top = (minutesFromOpen / 5) * TIME_SLOT_HEIGHT_5_MIN;
  const diff = (totalMin / 5) * TIME_SLOT_HEIGHT_5_MIN;
  return { top, diff };
};

export const calcTotalMinutes = (
  startHour: string,
  startMin: string,
  endHour: string,
  endMin: string,
) => {
  const startHourNum = Number(startHour);
  const startMinNum = Number(startMin);
  const endHourNum = Number(endHour);
  const endMinNum = Number(endMin);

  return (
    endHourNum * 60 +
    endMinNum -
    (startHourNum * ONE_HOUR_TO_MINUTES + startMinNum)
  );
};

export const calcMinutesFromOpen = (
  startHour: string,
  startMin: string,
  openHour: string,
  openMin: string,
) => {
  const startHourNum = Number(startHour);
  const startMinNum = Number(startMin);
  const openHourNum = Number(openHour);
  const openMinNum = Number(openMin);

  const startTotalMin = startHourNum * ONE_HOUR_TO_MINUTES + startMinNum;
  const openTotalMin = openHourNum * ONE_HOUR_TO_MINUTES + openMinNum;

  return startTotalMin - openTotalMin;
};

export const calcTotalFestivalMinutes = (
  startHour: string,
  startMin: string,
) => {
  const startHourNum = Number(startHour);
  const startMinNum = Number(startMin);

  const hoursUntilEnd = 24 - startHourNum;
  const totalFestivalMinutes = hoursUntilEnd * 60 - startMinNum;

  return totalFestivalMinutes;
};
