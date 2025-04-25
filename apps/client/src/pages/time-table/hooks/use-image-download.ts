import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface UseImageDownloadOptions {
  fileName?: string;
  excludeTags?: string[];
}

export const useImageDownload = <T extends HTMLElement>({
  fileName = 'download',
  excludeTags = ['BUTTON'],
}: UseImageDownloadOptions = {}) => {
  const elementRef = useRef<T>(null);

  const downloadImage = async () => {
    const element = elementRef.current;
    if (element) {
      try {
        // 원래 스타일 저장
        const originalStyles = new Map();

        // 스크롤이 있는 모든 요소 찾기
        const scrollElements = element.querySelectorAll('*');
        scrollElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          // 스크롤이 있는 요소 찾기
          if (
            htmlEl.scrollHeight > htmlEl.clientHeight ||
            htmlEl.scrollWidth > htmlEl.clientWidth
          ) {
            originalStyles.set(htmlEl, {
              overflow: htmlEl.style.overflow,
              height: htmlEl.style.height,
              maxHeight: htmlEl.style.maxHeight,
            });

            // 스크롤 요소의 스타일 변경
            htmlEl.style.overflow = 'visible';
            htmlEl.style.height = 'auto';
            htmlEl.style.maxHeight = 'none';
          }
        });

        // 메인 요소 스타일도 저장 및 수정
        originalStyles.set(element, {
          overflow: element.style.overflow,
          height: element.style.height,
          maxHeight: element.style.maxHeight,
        });
        element.style.overflow = 'visible';
        element.style.height = 'auto';
        element.style.maxHeight = 'none';

        const scale = window.devicePixelRatio * 2;

        // 수정된 후 전체 크기 다시 계산
        // reflow를 유도하기 위해 강제로 offsetHeight 접근
        element.offsetHeight;

        const fullHeight = Math.max(
          element.scrollHeight,
          element.offsetHeight,
          element.clientHeight,
        );
        const fullWidth = Math.max(
          element.scrollWidth,
          element.offsetWidth,
          element.clientWidth,
        );

        const blob = await domtoimage.toBlob(element, {
          filter: (node: Node) => {
            const el = node as Element;
            return !excludeTags.includes(el.tagName);
          },
          quality: 1,
          height: fullHeight * scale,
          width: fullWidth * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${fullWidth}px`,
            height: `${fullHeight}px`,
          },
        });

        // 원래 스타일로 복원
        scrollElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const originalStyle = originalStyles.get(htmlEl);
          if (originalStyle) {
            htmlEl.style.overflow = originalStyle.overflow;
            htmlEl.style.height = originalStyle.height;
            htmlEl.style.maxHeight = originalStyle.maxHeight;
          }
        });

        // 메인 요소 스타일 복원
        const mainOriginalStyle = originalStyles.get(element);
        if (mainOriginalStyle) {
          element.style.overflow = mainOriginalStyle.overflow;
          element.style.height = mainOriginalStyle.height;
          element.style.maxHeight = mainOriginalStyle.maxHeight;
        }

        saveAs(blob, fileName);
      } catch (error) {
        console.error('이미지 생성 실패:', error);
        throw error;
      }
    }
  };

  return {
    elementRef,
    downloadImage,
  };
};
