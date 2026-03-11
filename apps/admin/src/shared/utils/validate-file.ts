import { APP_CONFIG } from '@shared/constants';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 이미지 파일의 유효성을 검사합니다.
 * @param file - 검사할 파일
 * @param allowedTypes - 허용되는 MIME 타입 배열
 * @param maxSize - 최대 파일 크기 (바이트)
 * @returns 유효성 검사 결과
 */
export const validateImageFile = (
  file: File,
  allowedTypes: readonly string[] = APP_CONFIG.ALLOWED_IMAGE_TYPES,
  maxSize: number = APP_CONFIG.MAX_FILE_SIZE,
): FileValidationResult => {
  // 파일 타입 검사
  if (!Array.from(allowedTypes).includes(file.type)) {
    const allowedExtensions = allowedTypes
      .map((type) => type.split('/')[1].toUpperCase())
      .join(', ');
    return {
      isValid: false,
      error: `허용되지 않은 파일 형식입니다. (허용: ${allowedExtensions})`,
    };
  }

  // 파일 크기 검사
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `파일 크기가 너무 큽니다. (최대: ${maxSizeMB}MB)`,
    };
  }

  return { isValid: true };
};

/**
 * 로고 파일의 유효성을 검사합니다.
 * @param file - 검사할 파일
 * @returns 유효성 검사 결과
 */
export const validateLogoFile = (file: File): FileValidationResult => {
  return validateImageFile(file, APP_CONFIG.ALLOWED_LOGO_TYPES);
};

/**
 * 파일을 Base64 문자열로 변환합니다.
 * @param file - 변환할 파일
 * @returns Base64 문자열 Promise
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('파일 읽기에 실패했습니다.'));
      }
    };
    reader.onerror = () => reject(new Error('파일 읽기에 실패했습니다.'));
    reader.readAsDataURL(file);
  });
};
