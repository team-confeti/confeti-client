import { CONFIG } from '@shared/constants/api';

export const convertToCdnUrl = (
  s3Url: string,
  options: { width?: number; height?: number; quality?: number } = {},
): string => {
  const { width = 720, height = 540 } = options;
  const S3_BUCKET_PREFIX = 'confeti-bucket.s3.ap-northeast-2.amazonaws.com/';

  if (!s3Url.includes(S3_BUCKET_PREFIX)) {
    return s3Url;
  }

  const posterPath = s3Url.split(S3_BUCKET_PREFIX)[1];
  const cleanPath = posterPath ? posterPath.split('?')[0] : '';

  return `${CONFIG.IMAGE_CDN_URL}${cleanPath}?w=${width}&h=${height}&auto=format,enhance&q=75`;
};
