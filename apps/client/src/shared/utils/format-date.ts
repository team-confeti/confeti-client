import { WEEKDAYS } from '@shared/constants/day';

/**
 * 주어진 날짜 문자열에서 연, 월, 일을 추출하여 반환합니다.
 * @param {string} date - 날짜 문자열 (예: "2025-04-09")
 * @returns {{year: string, month: string, day: string}} - 연, 월(2자리), 일(2자리)
 */

const getDateParts = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return { year, month, day };
};

/**
 * 시작 날짜와 종료 날짜를 받아 형식에 맞는 날짜 문자열을 반환합니다.
 * @param {string} startAt - 시작 날짜 (예: "2025-04-09")
 * @param {string} endAt - 종료 날짜 (예: "2025-10-03")
 * @param {boolean} isPerformanceDetail - true이면 연도를 포함한 날짜 형식 사용
 * @returns {string} - 포맷된 날짜 문자열 (예: "2025.04.09 - 10.03" 또는 "2025.04.09 - 2025.10.03")
 */

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

/**
 * 예약 날짜를 포맷된 문자열로 변환합니다.
 * @param {string} reserveAt - 예약 날짜 문자열 (예: "2025-03-10T15:00:00Z")
 * @returns {string} - 포맷된 날짜 문자열 (예: "2025년 3월 10일 (월) 오후 3시")
 */

const getReserveDate = (reserveAt: string): string => {
  const parsedDate = new Date(reserveAt);

  const weekData = WEEKDAYS;

  const hours = parsedDate.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  const formattedDate = `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일 (${weekData[parsedDate.getDay()]}) ${period}${hour12}시`;

  return formattedDate;
};

const calculateDday = (reserveAt: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reserveDate = new Date(reserveAt);
  reserveDate.setHours(0, 0, 0, 0);

  const Dday = Math.ceil(
    (reserveDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
  );

  return Dday <= 0 ? 'D-DAY' : `D-${Dday}`;
};

export const formatDate = (
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
    case 'Dday':
      return calculateDday(date);
    default:
      return `${year}.${month}.${day}`;
  }
};
