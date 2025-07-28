import { formatDate, getAddedDate } from './format-date';

describe('formatDate', () => {
  const date = '2025-04-09';
  const reserveAt = '2025-04-09T02:00:00Z';

  it('기본 형식으로 포맷되어야 한다', () => {
    expect(formatDate(date)).toBe('2025.04.09');
  });

  it('koHalf 형식으로 포맷되어야 한다', () => {
    expect(formatDate(date, 'koHalf')).toBe('2025년 04월');
  });

  it('koFull 형식으로 포맷되어야 한다', () => {
    const result = formatDate(reserveAt, 'koFull');
    expect(result).toContain('2025년 4월 9일');
    expect(result).toMatch(/\((일|월|화|수|목|금|토)\)/);
  });

  it('Dday가 D-0 이하면 D-DAY를 반환해야 한다', () => {
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    expect(formatDate(isoToday, 'Dday')).toBe('D-DAY');
  });

  it('startEndFull 형식은 연도 포함', () => {
    expect(formatDate('', 'startEndFull', '2025-04-09', '2025-10-03')).toBe(
      '2025.04.09 - 10.03',
    );
  });

  it('startEndHalf 형식은 연도 생략 안 함', () => {
    expect(formatDate('', 'startEndHalf', '2025-04-09', '2025-10-03')).toBe(
      '2025.04.09 - 2025.10.03',
    );
  });

  it('날짜가 없으면 빈 문자열을 반환한다', () => {
    expect(formatDate('')).toBe('');
  });
});

describe('getAddedDate', () => {
  it('오늘 날짜일 경우 "오늘 추가됨"을 반환한다', () => {
    const today = new Date().toISOString();
    expect(getAddedDate(today)).toBe('오늘 추가됨');
  });

  it('어제 날짜일 경우 "1일 전 추가됨"을 반환한다', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const iso = yesterday.toISOString();
    expect(getAddedDate(iso)).toBe('1일 전 추가됨');
  });

  it('며칠 전인 경우 정확한 일수를 반환한다', () => {
    const past = new Date();
    past.setDate(past.getDate() - 5);
    const iso = past.toISOString();
    expect(getAddedDate(iso)).toBe('5일 전 추가됨');
  });
});
