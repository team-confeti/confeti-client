import { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

interface UseImageDownloadOptions {
  fileName: string;
  stageCount?: number;
  quality?: number;
  backgroundColor?: string;
}

interface UseImageDownloadReturn<T extends HTMLElement> {
  elementRef: React.RefObject<T | null>;
  downloadImage: () => Promise<{ success: boolean; message: string }>;
}

export const useImageDownload = <T extends HTMLElement>({
  fileName,
  stageCount,
  quality = 1,
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
      const element = elementRef.current;
      let originalStyles: { [key: string]: string } = {};
      const parentOriginalStyles: { [key: string]: string } = {};

      // 4 스테이지 이상인 경우 스타일 임시 변경
      if (stageCount && stageCount >= 4) {
        originalStyles = {
          width: element.style.width,
          minWidth: element.style.minWidth,
          maxWidth: element.style.maxWidth,
          overflow: element.style.overflow,
          position: element.style.position,
        };

        let parentElement = element.parentElement;
        while (parentElement && parentElement !== document.body) {
          const computedStyle = window.getComputedStyle(parentElement);
          if (
            computedStyle.overflow === 'hidden' ||
            computedStyle.overflowX === 'hidden' ||
            computedStyle.overflowX === 'auto' ||
            computedStyle.overflowX === 'scroll'
          ) {
            parentOriginalStyles[parentElement.className || 'parent'] =
              parentElement.style.overflow;
            parentElement.style.overflow = 'visible';
            parentElement.style.overflowX = 'visible';
          }
          parentElement = parentElement.parentElement;
        }

        // 캡쳐 영역 조정
        element.style.width = '480px';
        element.style.minWidth = '480px';
        element.style.maxWidth = 'none';
        element.style.overflow = 'visible';
        element.style.position = 'relative';

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const captureOptions: Record<string, unknown> = {
        quality,
        backgroundColor,
        pixelRatio: 2,
        skipAutoScale: true,
        // CORS 문제 해결을 위한 옵션
        skipFonts: true,
        cacheBust: false,
        imagePlaceholder: '',
        includeQueryParams: false,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      };

      if (stageCount && stageCount >= 4) {
        captureOptions.width = 480;
        captureOptions.style = {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '480px',
          minWidth: '480px',
          maxWidth: 'none',
          overflow: 'visible',
          position: 'relative',
        };
      }
      const dataUrl = await toPng(element, captureOptions);

      // 원래 스타일로 복원
      if (stageCount && stageCount >= 4) {
        Object.keys(originalStyles).forEach((key) => {
          if (originalStyles[key]) {
            element.style.setProperty(key, originalStyles[key]);
          } else {
            element.style.removeProperty(key);
          }
        });

        // 부모 요소 스타일 복원
        let parentElement = element.parentElement;
        while (parentElement && parentElement !== document.body) {
          const className = parentElement.className || 'parent';
          if (parentOriginalStyles[className] !== undefined) {
            parentElement.style.overflow = parentOriginalStyles[className];
          }
          parentElement = parentElement.parentElement;
        }
      }

      // 이미지 다운로드
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
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
  }, [fileName, stageCount, quality, backgroundColor]);

  return {
    elementRef,
    downloadImage,
  };
};
