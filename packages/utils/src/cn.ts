import { clsx } from 'clsx/lite';

/**
 * 주어진 클래스 이름들을 조건에 따라 병합하여 문자열로 반환합니다.
 * @param {Array<string | undefined>} inputs - 클래스 이름 문자열 또는 undefined 값들의 배열
 * @returns {string} 병합된 클래스 이름 문자열
 */
export function cn(...inputs: Array<string | undefined>) {
  return clsx(...inputs);
}
