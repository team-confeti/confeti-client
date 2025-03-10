import { WEEKDAYS } from '@shared/constants/day';

const getDateParts = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return { year, month, day };
};

const getStartAtEndAt = (
  startAt: string,
  endAt: string,
  isPerformanceDetail: boolean,
) => {
  const {
    year: startYear,
    month: startMonth,
    day: startDay,
  } = getDateParts(startAt);
  const { year: endYear, month: endMonth, day: endDay } = getDateParts(endAt);

  return `${startYear}.${startMonth}.${startDay} - ${isPerformanceDetail ? `${endYear}.${endMonth}.${endDay}` : `${endMonth}.${endDay}`}`;
};

const getReserveDate = (reserveAt: string): string => {
  const parsedDate = new Date(reserveAt);

  const weekData = WEEKDAYS;

  const hours = parsedDate.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  const formattedDate = `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일 (${weekData[parsedDate.getDay()]}) ${period}${hour12}시`;

  return formattedDate;
};

export const useFormattedDate = (
  date: string = '',
  formatStyle: string = 'default',
  startAt?: string,
  endAt?: string,
) => {
  if (formatStyle === 'startEndFull' && startAt && endAt) {
    return getStartAtEndAt(startAt, endAt, false);
  }

  if (formatStyle === 'startEndHalf' && startAt && endAt) {
    return getStartAtEndAt(startAt, endAt, true);
  }

  if (!date) return '';

  const { year, month, day } = getDateParts(date);

  switch (formatStyle) {
    case 'koHalf':
      return `${year}년 ${month}월`;
    case 'koFull':
      return getReserveDate(date);
    default:
      return `${year}.${month}.${day}`;
  }
};
