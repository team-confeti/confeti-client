import { cn } from './cn';

describe('cn', () => {
  it('joins multiple class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('ignores undefined values', () => {
    expect(cn('a', undefined, 'c')).toBe('a c');
  });

  it('returns empty string when all are undefined', () => {
    expect(cn(undefined, undefined)).toBe('');
  });

  it('handles single class name', () => {
    expect(cn('a')).toBe('a');
  });

  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });
});
