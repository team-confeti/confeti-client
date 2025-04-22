/**
 * 텍스트를 지정한 글자 수로 자르고 초과 시 "..."을 붙여 반환합니다.
 * @param text 원본 문자열
 * @param maxLength 최대 글자 수 (기본값 10자)
 * @returns 잘린 문자열
 */
export const limitTextLength = (text: string, maxLength = 10): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
