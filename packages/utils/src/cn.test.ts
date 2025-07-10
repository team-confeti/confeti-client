import { cn } from './cn';

describe('cn function', () => {
  it('여러 클래스명을 공백으로 연결해야 한다', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('undefined 값을 무시해야 한다', () => {
    expect(cn('a', undefined, 'c')).toBe('a c');
  });

  it('모든 값이 undefined일 때 빈 문자열을 반환해야 한다', () => {
    expect(cn(undefined, undefined)).toBe('');
  });

  it('단일 클래스명을 처리할 수 있어야 한다', () => {
    expect(cn('a')).toBe('a');
  });

  it('인자가 없을 때 빈 문자열을 반환해야 한다', () => {
    expect(cn()).toBe('');
  });
});
