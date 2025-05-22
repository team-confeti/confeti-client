import { CONFIG } from '@shared/constants/api';

/**
 * S3 URL을 CDN URL로 변환하여 이미지 최적화 파라미터를 적용합니다.
 *
 * @param s3Url - 변환할 S3 URL
 * @param options - 이미지 최적화 옵션
 * @param options.width - 이미지 너비 (기본값: 720)
 * @param options.height - 이미지 높이 (기본값: 540)
 * @param options.quality - 이미지 품질 (1-100, 기본값: 75)
 * @returns 최적화된 CDN URL 또는 원본 URL (S3 URL이 아닌 경우)
 *
 * @example
 * ```typescript
 * // 커스텀 옵션으로 변환
 * const customCdnUrl = convertToCdnUrl(
 *   'https://confeti-bucket.s3.ap-northeast-2.amazonaws.com/images/poster.jpg',
 *   { width: 1200, height: 800, quality: 90 }
 * );
 * ```
 */

export const convertToCdnUrl = (
  s3Url: string,
  options: { width?: number; height?: number; quality?: number } = {},
): string => {
  const { width = 720, height = 540, quality = 75 } = options;
  const S3_BUCKET_URL = 'confeti-bucket.s3.ap-northeast-2.amazonaws.com/';

  if (!s3Url.includes(S3_BUCKET_URL)) {
    return s3Url;
  }

  const posterPath = s3Url.split(S3_BUCKET_URL)[1];
  const cleanPath = posterPath ? posterPath.split('?')[0] : '';

  return `${CONFIG.IMAGE_CDN_URL}${cleanPath}?w=${width}&h=${height}&auto=format,enhance&q=${quality}`;
};
