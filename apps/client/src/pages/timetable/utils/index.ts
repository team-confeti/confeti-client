import { ONE_HOUR_TO_MINUTES } from '@pages/timetable/constants';

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
