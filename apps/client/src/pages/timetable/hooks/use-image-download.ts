import { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

interface UseImageDownloadOptions {
  fileName: string;
  quality?: number;
  backgroundColor?: string;
}

interface UseImageDownloadReturn<T extends HTMLElement> {
  elementRef: React.RefObject<T | null>;
  downloadImage: () => Promise<{ success: boolean; message: string }>;
}

export const useImageDownload = <T extends HTMLElement>({
  fileName,
  quality = 0.95,
  backgroundColor = '#ffffff',
}: UseImageDownloadOptions): UseImageDownloadReturn<T> => {
  const elementRef = useRef<T>(null);

  const downloadImage = useCallback(async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    if (!elementRef.current) {
      return {
        success: false,
        message: '이미지를 생성할 요소를 찾을 수 없습니다.',
      };
    }

    try {
      // HTML 요소를 PNG 이미지로 변환
      const dataUrl = await toPng(elementRef.current, {
        quality,
        backgroundColor,
        pixelRatio: 2, // 고해상도를 위한 설정
        skipAutoScale: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      // 이미지 다운로드
      const link = document.createElement('a');
      link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return {
        success: true,
        message: '이미지가 성공적으로 저장되었습니다.',
      };
    } catch (error) {
      console.error('이미지 생성 중 오류:', error);

      return {
        success: false,
        message: '이미지 저장 중 오류가 발생했습니다.',
      };
    }
  }, [fileName, quality, backgroundColor]);

  return {
    elementRef,
    downloadImage,
  };
};
