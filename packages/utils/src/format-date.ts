export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

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
 *
 * startAt과 endAt이 같으면 하나의 날짜만 반환합니다.
 *
 * @param {string} startAt - 시작 날짜 (예: "2025-04-09")
 * @param {string} endAt - 종료 날짜 (예: "2025-10-03")
 * @param {boolean} isPerformanceDetail - true이면 연도를 포함한 날짜 형식 사용
 * @returns {string} - 포맷된 날짜 문자열
 *   - startAt === endAt인 경우: "2025.04.09"
 *   - isPerformanceDetail이 false인 경우: "2025.04.09 - 10.03"
 *   - isPerformanceDetail이 true인 경우: "2025.04.09 - 2025.10.03"
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

  if (startAt === endAt) {
    return `${startYear}.${startMonth}.${startDay}`;
  }

  return `${startYear}.${startMonth}.${startDay} - ${isPerformanceDetail ? `${endYear}.${endMonth}.${endDay}` : `${endMonth}.${endDay}`}`;
};

/**
 * 예약 날짜를 포맷된 문자열로 변환합니다.
 * @param {string} reserveAt - 예약 날짜 문자열 (예: "2025-03-10T15:00:00Z")
 * @returns {string} - 포맷된 날짜 문자열 (예: "2025년 3월 10일 (월) 오후 3시")
 */
const formatWithTimezone = (
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) => date.toLocaleString(locale, { timeZone: 'Asia/Seoul', ...options });

export const getReserveDate = (reserveAt: string): string => {
  const parsedDate = new Date(reserveAt);

  const year = formatWithTimezone(parsedDate, 'ko-KR', { year: 'numeric' });
  const month = formatWithTimezone(parsedDate, 'ko-KR', { month: 'numeric' });
  const day = formatWithTimezone(parsedDate, 'ko-KR', { day: 'numeric' });
  const dayOfWeek = formatWithTimezone(parsedDate, 'ko-KR', {
    weekday: 'short',
  });

  let hourNum = Number(
    formatWithTimezone(parsedDate, 'en-US', { hour12: false, hour: 'numeric' }),
  );
  if (hourNum === 24) hourNum = 0;

  const period = hourNum < 12 ? '오전' : '오후';
  const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;

  return `${year} ${month} ${day} (${dayOfWeek}) ${period}${hour12}시`;
};

/**
 * 주어진 예약 날짜(reserveAt)와 오늘 날짜를 비교하여 D-day 형식의 문자열을 반환합니다.
 *
 * - 예약일이 오늘이거나 과거일 경우: "D-DAY" 반환
 * - 예약일이 미래일 경우: "D-N" 형식으로, 오늘로부터 N일 후를 반환
 *
 * @param {string} reserveAt - 예약 날짜 문자열 (예: "2025-04-09")
 * @returns {string} D-day 형식의 문자열 (예: "D-DAY", "D-3")
 */
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

/**
 * 주어진 날짜 문자열을 다양한 형식으로 포맷하여 반환합니다.
 *
 * @param {string} [date=''] - 포맷할 날짜 문자열 (ISO 8601 형식 권장, 예: '2025-07-31' 또는 '2025-07-31T15:00:00Z')
 * @param {'default' | 'koYearMonth' | 'koFullDateTimeWithWeekday' | 'Dday' | 'rangeStartEndYearBoth' | 'rangeStartYearOnly'} [formatStyle='default'] - 출력할 날짜 형식
 * @param {string} [startAt] - 시작 날짜 (rangeStartEndYearBoth, rangeStartYearOnly 포맷 시 필요)
 * @param {string} [endAt] - 종료 날짜 (rangeStartEndYearBoth, rangeStartYearOnly 포맷 시 필요)
 * @returns {string} 포맷된 날짜 문자열
 *
 * @example
 * formatDate('2025-04-09'); // '2025.04.09'
 * formatDate('2025-04-09', 'koYearMonth'); // '2025년 04월'
 * formatDate('2025-04-09T15:00:00Z', 'koFullDateTimeWithWeekday'); // '2025년 4월 9일 (수) 오후 3시'
 * formatDate('2025-04-09', 'Dday'); // 'D-XX' 또는 'D-DAY'
 * formatDate('', 'rangeStartEndYearBoth', '2025-04-09', '2025-10-03'); // '2025.04.09 - 10.03'
 */
export const formatDate = (
  date: string = '',
  formatStyle: string = 'default',
  startAt?: string,
  endAt?: string,
) => {
  if (formatStyle === 'rangeStartEndYearBoth' && startAt && endAt) {
    return getStartAtEndAt(startAt, endAt, false);
  }

  if (formatStyle === 'rangeStartYearOnly' && startAt && endAt) {
    return getStartAtEndAt(startAt, endAt, true);
  }

  if (!date) return '';

  const { year, month, day } = getDateParts(date);

  switch (formatStyle) {
    case 'koYearMonth':
      return `${year}년 ${month}월`;
    case 'koFullDateTimeWithWeekday':
      return getReserveDate(date);
    case 'Dday':
      return calculateDday(date);
    default:
      return `${year}.${month}.${day}`;
  }
};

/**
 * 아티스트가 추가된 날짜를 기준으로 "오늘 추가됨" 또는 "N일 전 추가됨" 형식의 문자열을 반환합니다.
 *
 * @param {string} createdAt - ISO 형식의 날짜 문자열 (예: "2025-04-20T23:28:30")
 * @returns {string} - 포맷된 날짜 정보 (예: "오늘 추가됨", "2일 전 추가됨")
 */
export const getAddedDate = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffTime = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '오늘 추가됨';
  }

  return `${diffDays}일 전 추가됨`;
};
