/**
 * 날짜를 짧은 형식으로 포맷팅합니다.
 * @param dateStr - ISO 날짜 문자열 (예: "2025-02-13")
 * @returns 포맷된 날짜 문자열 (예: "02.13")
 */
export const formatDateShort = (dateStr: string): string => {
  const [, month, day] = dateStr.split('-');
  return `${month}.${day}`;
};

/**
 * 날짜를 전체 형식으로 포맷팅합니다.
 * @param dateStr - ISO 날짜 문자열 (예: "2025-02-13")
 * @returns 포맷된 날짜 문자열 (예: "2025.02.13")
 */
export const formatDateFull = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${year}.${month}.${day}`;
};

/**
 * 날짜를 한글 형식으로 포맷팅합니다.
 * @param dateStr - ISO 날짜 문자열 (예: "2025-02-13")
 * @returns 포맷된 날짜 문자열 (예: "2025년 2월 13일")
 */
export const formatDateKorean = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  const monthNum = Number(month);
  const dayNum = Number(day);
  return `${year}년 ${monthNum}월 ${dayNum}일`;
};

/**
 * 시작일과 종료일을 기준으로 날짜 배열을 생성합니다.
 * @param startDate - 시작일 (ISO 형식)
 * @param endDate - 종료일 (ISO 형식)
 * @returns 날짜 배열
 */
export const generateDateRange = (
  startDate: string,
  endDate: string,
): string[] => {
  if (!startDate || !endDate) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d).toISOString().split('T')[0]);
  }

  return dates;
};

/**
 * 현재 날짜가 과거인지 확인합니다.
 * @param dateStr - 확인할 날짜 문자열
 * @returns 과거 날짜 여부
 */
export const isDatePast = (dateStr: string): boolean => {
  const targetDate = new Date(dateStr);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < currentDate;
};
