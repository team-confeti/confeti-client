import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatDate, getAddedDate } from './format-date';

describe('formatDate 함수 테스트', () => {
  beforeEach(() => {
    // 시간을 고정합니다
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 테스트 후 실제 시간으로 복원
    vi.useRealTimers();
  });

  const date = '2025-04-09';

  it('기본 형식으로 포맷되어야 한다', () => {
    expect(formatDate(date)).toBe('2025.04.09');
  });

  it('월, 일이 한 자리인 날짜도 올바르게 포맷되어야 한다', () => {
    const input = '2025-4-9';
    expect(formatDate(input)).toBe('2025.04.09');
  });

  it('koHalf 형식으로 포맷되어야 한다', () => {
    expect(formatDate(date, 'koHalf')).toBe('2025년 04월');
  });

  describe('koFull 형식 테스트', () => {
    it('날짜와 요일이 올바르게 포함되어야 한다', () => {
      // 특정 시간으로 설정
      vi.setSystemTime(new Date('2025-04-09T11:00:00+09:00'));

      const reserveAt = '2025-04-09T02:00:00Z';
      const result = formatDate(reserveAt, 'koFull');
      expect(result).toContain('2025년 4월 9일');
      expect(result).toMatch(/\((일|월|화|수|목|금|토)\)/);
    });

    it('오전 시간은 "오전 N시"로 표기되어야 한다', () => {
      // 한국 시간 기준으로 오전 9시가 되도록 시스템 시간 설정
      vi.setSystemTime(new Date('2025-04-09T09:00:00+09:00'));

      // UTC 기준으로 자정 (한국시간 오전 9시)
      const morning = '2025-04-09T00:00:00Z';
      const result = formatDate(morning, 'koFull');
      expect(result).toMatch(/오전\s?9시/);
    });

    it('오후 시간은 "오후 N시"로 표기되어야 한다', () => {
      // 한국 시간 기준으로 오후 3시가 되도록 설정
      vi.setSystemTime(new Date('2025-04-09T15:00:00+09:00'));

      // UTC 기준으로 오전 6시 (한국시간 오후 3시)
      const afternoon = '2025-04-09T06:00:00Z';
      const result = formatDate(afternoon, 'koFull');
      expect(result).toMatch(/오후\s?3시/);
    });

    it('자정은 "오전 12시"로 표기되어야 한다', () => {
      // 한국 시간 기준으로 자정이 되도록 설정
      vi.setSystemTime(new Date('2025-04-09T00:00:00+09:00'));

      // UTC 기준으로 오후 3시 전날 (한국시간 자정)
      const midnight = '2025-04-08T15:00:00Z';
      const result = formatDate(midnight, 'koFull');
      expect(result).toMatch(/오전\s?12시/);
    });

    it('정오는 "오후 12시"로 표기되어야 한다', () => {
      // 한국 시간 기준으로 정오가 되도록 설정
      vi.setSystemTime(new Date('2025-04-09T12:00:00+09:00'));

      // UTC 기준으로 오전 3시 (한국시간 정오)
      const noon = '2025-04-09T03:00:00Z';
      const result = formatDate(noon, 'koFull');
      expect(result).toMatch(/오후\s?12시/);
    });
  });

  describe('Dday 포맷 테스트', () => {
    it('오늘 날짜일 경우 "D-DAY"를 반환한다', () => {
      // 특정 날짜로 시스템 시간 고정
      const testDate = new Date('2025-04-09T12:00:00+09:00');
      vi.setSystemTime(testDate);

      const today = '2025-04-09';
      expect(formatDate(today, 'Dday')).toBe('D-DAY');
    });

    it('과거 날짜일 경우에도 "D-DAY"를 반환한다', () => {
      // 오늘을 4월 12일로 설정
      vi.setSystemTime(new Date('2025-04-12T12:00:00+09:00'));

      const pastDate = '2025-04-09';
      expect(formatDate(pastDate, 'Dday')).toBe('D-DAY');
    });

    it('미래 날짜일 경우 "D-N" 형식으로 반환한다', () => {
      // 오늘을 4월 4일로 설정
      vi.setSystemTime(new Date('2025-04-04T12:00:00+09:00'));

      const futureDate = '2025-04-09';
      expect(formatDate(futureDate, 'Dday')).toBe('D-5');
    });
  });

  describe('startEndFull / startEndHalf 포맷 - 동일 날짜 처리 및 기본 동작', () => {
    const sameDate = '2025-04-09';

    it('startEndFull 포맷에서 startAt과 endAt이 같으면 단일 날짜를 반환한다', () => {
      expect(formatDate('', 'startEndFull', sameDate, sameDate)).toBe(
        '2025.04.09',
      );
    });

    it('startEndHalf 포맷에서 startAt과 endAt이 같으면 단일 날짜를 반환한다', () => {
      expect(formatDate('', 'startEndHalf', sameDate, sameDate)).toBe(
        '2025.04.09',
      );
    });

    it('startEndFull 포맷은 연도 포함, endAt 날짜는 월/일만 표기한다', () => {
      expect(formatDate('', 'startEndFull', '2025-04-09', '2025-10-03')).toBe(
        '2025.04.09 - 10.03',
      );
    });

    it('startEndHalf 포맷은 연도를 생략하지 않고 startAt, endAt 모두 연도 포함해 표기한다', () => {
      expect(formatDate('', 'startEndHalf', '2025-04-09', '2025-10-03')).toBe(
        '2025.04.09 - 2025.10.03',
      );
    });
  });

  it('날짜가 없으면 빈 문자열을 반환한다', () => {
    expect(formatDate('')).toBe('');
  });
});

describe('getAddedDate 함수 테스트', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('오늘 날짜일 경우 "오늘 추가됨"을 반환한다', () => {
    const testDate = new Date('2025-04-09T12:00:00+09:00');
    vi.setSystemTime(testDate);

    const today = testDate.toISOString();
    expect(getAddedDate(today)).toBe('오늘 추가됨');
  });

  it('어제 날짜일 경우 "1일 전 추가됨"을 반환한다', () => {
    // 오늘을 4월 10일로 설정
    vi.setSystemTime(new Date('2025-04-10T12:00:00+09:00'));

    // 어제 (4월 9일) 날짜
    const yesterday = new Date('2025-04-09T12:00:00+09:00');
    expect(getAddedDate(yesterday.toISOString())).toBe('1일 전 추가됨');
  });

  it('며칠 전인 경우 정확한 일수를 반환한다', () => {
    // 오늘을 4월 14일로 설정
    vi.setSystemTime(new Date('2025-04-14T12:00:00+09:00'));

    // 5일 전 (4월 9일) 날짜
    const past = new Date('2025-04-09T12:00:00+09:00');
    expect(getAddedDate(past.toISOString())).toBe('5일 전 추가됨');
  });
});
