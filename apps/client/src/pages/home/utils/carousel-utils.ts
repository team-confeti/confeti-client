/**
 * 모듈로 연산
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * 부드러운 애니메이션을 위한 easing 함수
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
